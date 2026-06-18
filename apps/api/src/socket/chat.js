"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatHandlers = registerChatHandlers;
const chat_service_1 = require("../modules/chat/chat.service");
const typebox_1 = require("typebox");
const value_1 = require("typebox/value");
const CreateRoomData = typebox_1.Type.Object({
    to: typebox_1.Type.Number(),
    type: typebox_1.Type.Union([typebox_1.Type.Literal("private"), typebox_1.Type.Literal("group")]),
});
const JoinRoomData = typebox_1.Type.Object({
    roomId: typebox_1.Type.Number(),
});
const newMessageData = typebox_1.Type.Object({
    roomId: typebox_1.Type.Number(),
    message: typebox_1.Type.String(),
    user: typebox_1.Type.Optional(typebox_1.Type.Object({
        id: typebox_1.Type.Number(),
        name: typebox_1.Type.String(),
        email: typebox_1.Type.String({ format: 'email' })
    })),
    to: typebox_1.Type.Number(),
});
const messageStatusData = typebox_1.Type.Object({
    roomId: typebox_1.Type.Number(),
    messageId: typebox_1.Type.Number(),
    status: typebox_1.Type.Union([
        typebox_1.Type.Literal("pending"),
        typebox_1.Type.Literal("sent"),
        typebox_1.Type.Literal("read"),
    ]),
});
function parse(schema, payload, socket, joinId) {
    try {
        return value_1.Value.Parse(schema, payload);
    }
    catch (error) {
        try {
            socket.emit("room:error", {
                message: "Invalid data format",
                details: error.message,
            });
        }
        catch (emitError) {
            console.error("Failed to emit error message:", emitError);
        }
        return null;
    }
}
function registerChatHandlers(io, socket, joinId) {
    socket.on("create:room", async (data) => {
        const dataParse = parse(CreateRoomData, data, socket, joinId);
        console.log("Received create:room with data:", dataParse);
        if (!dataParse)
            return;
        const conversation = await chat_service_1.chatService.createConversation({
            type: data.type,
            name: "",
        });
        if (!conversation) {
            socket.emit("error", { message: "Failed to create conversation" });
            return;
        }
        await chat_service_1.chatService.addParticipants([
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
    socket.on("join:room", async (data) => {
        const dataParse = parse(JoinRoomData, data, socket, joinId);
        if (!dataParse)
            return;
        await socket.join(data.roomId.toString());
        socket
            .to(data.roomId.toString())
            .emit("user:joined", {
            userId: socket.data.user.id,
            roomId: data.roomId,
        });
    });
    socket.on("leave:room", async (roomId) => {
        await socket.leave(roomId);
        socket
            .to(roomId)
            .emit("user:left", { userId: socket.data.user.id, roomId });
    });
    socket.on("new:message", async (data) => {
        const dataParse = parse(newMessageData, data, socket, joinId);
        if (!dataParse)
            return;
        const conversationId = parseInt(data.roomId.toString());
        const messageData = {
            conversationId: conversationId,
            from: socket.data.user.id,
            user: {
                name: socket.data.user.name,
                email: socket.data.user.email,
                id: socket.data.user.id
            },
            to: data.to,
            message: data.message,
        };
        await chat_service_1.chatService.newMessage(messageData);
        await chat_service_1.chatService.activateParticipants(conversationId);
        io.to(data.roomId.toString()).emit("message:new", {
            ...messageData,
            createdAt: new Date(),
        });
        socket.to(`user_${data.to}`).emit("new:notification", {
            type: "new_message",
            data: messageData,
        });
    });
    socket.on("update:messageStatus", async (data) => {
        chat_service_1.chatService.updateMessageStatus({
            messageId: data.messageId,
            userId: socket.data.user.id,
            messageStatus: data.status,
        });
    });
}
