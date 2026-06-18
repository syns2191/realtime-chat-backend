"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketMiddleware = registerSocketMiddleware;
const chat_1 = require("./chat");
function registerSocketMiddleware(io) {
    io.on("connection", (socket) => {
        const user = socket.data.user;
        console.log(`User ${user.id} connected`);
        const joinId = `user_${user.id}`;
        socket.join(joinId);
        (0, chat_1.registerChatHandlers)(io, socket, joinId);
        socket.on("disconnect", () => {
            console.log(`User ${user.id} disconnected`);
        });
    });
}
