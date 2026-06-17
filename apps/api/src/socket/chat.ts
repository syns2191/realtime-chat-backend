import { Server, Socket } from "socket.io";
import { chatService } from "../modules/chat/chat.service";
import { Type } from "typebox";
import { Value } from "typebox/value";

const CreateRoomData = Type.Object({
  to: Type.Number(),
  type: Type.Union([Type.Literal("private"), Type.Literal("group")]),
});

const JoinRoomData = Type.Object({
  roomId: Type.Number(),
});

const newMessageData = Type.Object({
  roomId: Type.Number(),
  message: Type.String(),
  user: Type.Optional(Type.Object({
    id: Type.Number(),
    name: Type.String(),
    email: Type.String({ format: 'email'})
  })),
  to: Type.Number(),
});

const messageStatusData = Type.Object({
  roomId: Type.Number(),
  messageId: Type.Number(),
  status: Type.Union([
    Type.Literal("pending"),
    Type.Literal("sent"),
    Type.Literal("read"),
  ]),
});

type TCreateRoomData = Type.Static<typeof CreateRoomData>;
type TJoinRoomData = Type.Static<typeof JoinRoomData>;
type TNewMessageData = Type.Static<typeof newMessageData>;
type TMessageStatusData = Type.Static<typeof messageStatusData>;

function parse<T>(
  schema: unknown,
  payload: unknown,
  socket: Socket,
  joinId: string,
): T | null {
  try {
    return Value.Parse(schema as any, payload) as T;
  } catch (error: any) {
    try {
      socket.emit("room:error", {
        message: "Invalid data format",
        details: error.message,
      });
    } catch (emitError) {
      console.error("Failed to emit error message:", emitError);
    }
    return null;
  }
}

export function registerChatHandlers(
  io: Server,
  socket: Socket,
  joinId: string,
) {
  socket.on("create:room", async (data: TCreateRoomData) => {
    const dataParse = parse<TCreateRoomData>(
      CreateRoomData,
      data,
      socket,
      joinId,
    );
    console.log("Received create:room with data:", dataParse);
    if (!dataParse) return;

    const conversation = await chatService.createConversation({
      type: data.type,
      name: "",
    });
    if (!conversation) {
      socket.emit("error", { message: "Failed to create conversation" });
      return;
    }
    await chatService.addParticipants([
      {
        conversationId: conversation.id,
        userId: socket.data.user.id,
      },
      {
        conversationId: conversation.id,
        userId: data.to,
      },
    ]);
    socket.emit("room:created", { conversationId: conversation.id });
  });
  socket.on("join:room", async (data: TJoinRoomData) => {
    const dataParse = parse<TJoinRoomData>(JoinRoomData, data, socket, joinId);
    if (!dataParse) return;
    await socket.join(data.roomId.toString());
    socket
      .to(data.roomId.toString())
      .emit("user:joined", {
        userId: socket.data.user.id,
        roomId: data.roomId,
      });
  });
  socket.on("leave:room", async (roomId: string) => {
    await socket.leave(roomId);
    socket
      .to(roomId)
      .emit("user:left", { userId: socket.data.user.id, roomId });
  });
  socket.on("new:message", async (data: TNewMessageData) => {
    const dataParse = parse<TNewMessageData>(
      newMessageData,
      data,
      socket,
      joinId,
    );
    if (!dataParse) return;
    const conversationId = parseInt(data.roomId.toString())
    const messageData = {
      conversationId: conversationId,
      from: socket.data.user.id,
      user:{
        name: socket.data.user.name,
        email: socket.data.user.email,
        id: socket.data.user.id
      },
      to: data.to,
      message: data.message,
    };

    await chatService.newMessage(messageData);
    await chatService.activateParticipants(conversationId);
    io.to(data.roomId.toString()).emit("message:new", {
      ...messageData,
      createdAt: new Date(),
    });
    socket.to(`user_${data.to}`).emit("new:notification", {
      type: "new_message",
      data: messageData,
    });
  });

  socket.on("update:messageStatus", async (data: TMessageStatusData) => {
    chatService.updateMessageStatus({
      messageId: data.messageId,
      userId: socket.data.user.id,
      messageStatus: data.status,
    });
  });
}
