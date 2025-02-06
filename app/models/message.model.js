const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true }, // ID of the sender (user or admin)
    receiverId: { type: String, required: true }, // ID of the receiver
    message: { type: String, required: true }, // Text message
    fileUrl: { type: String }, // URL of the uploaded file (if any)
    voiceUrl: { type: String }, // URL of the voice recording (if any)
    isDeleted: { type: Boolean, default: false }, // Flag to mark deleted messages
    timestamp: { type: Date, default: Date.now } // Timestamp of the message
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;