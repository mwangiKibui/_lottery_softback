const db = require("../../models");
const Message = db.message;
const User = db.user;

// Fetch messages between two users
exports.getMessages = async (req, res) => {
    const { senderId } = req.query;
    let receiverId = req.user._id;

    try {
        // Fetch messages between sender and receiver
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ],
            isDeleted: false
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.sendMessage = async (req, res) => {
    const { receiverId, type } = req.body;
    let content = '';
  
    if (type === 'text') {
      content = req.body.content;
    } else if (type === 'file' || type === 'voice') {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      content = 'chat/'+req.file.filename;
    }
  
    try {
      let message = new Message({
        receiverId: receiverId,
        senderId: req.user._id,
        message: req.body.content,
      });
      if(type == 'file'){
        message.fileUrl = content;
        message.message = req.body.content ? req.body.content : "Sent File";
      }else if(type == 'voice'){
        message.voiceUrl = content;
        message.message = req.body.content ? req.body.content : "Sent Voice";
      }
      await message.save();
      res.status(200).json(message);
    } catch (error) {
      console.log("an error occurred sending message ",error);
      res.status(500).json({ message: 'Error sending message', error });
    }
  };
  
  // Broadcast a message to all sellers (supports text, file, and voice)
  exports.broadcastMessage = async (req, res) => {
    const { type } = req.body;
    let content = '';
  
    if (type === 'text') {
      content = req.body.content;
    } else if (type === 'file' || type === 'voice') {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if(type == 'file'){
        content = 'files/sub-admins/'+req.file.filename;
      }else if(type == 'voice'){
        content = 'voices/sub-admins/'+req.file.filename;
      }
    }
  
    try {
      const sellers = await User.find({
        role:"seller"
      });
      for (const seller of sellers) {
        let message = new Message({
          receiverId: seller._id,
          senderId: req.user._id,
          message: req.body.content,
        });
        if(type == 'file'){
          message.fileUrl = content;
          message.message = req.body.content ? req.body.content : "Sent File";
        }else if(type == 'voice'){
          message.voiceUrl = content;
          message.message = req.body.content ? req.body.content : "Sent Voice";
        }
        await message.save();
      }
      res.status(200).json({ message: 'Broadcast successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error broadcasting message', error });
    }
  };

// editing message.
exports.editMessage = async (req, res) => {
    const { messageId } = req.params; // Get message ID from URL params
    const { newMessage } = req.body; // Get updated message from request body

    try {
        // Find the message by ID and update its content
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { message: newMessage },
            { new: true } // Return the updated message
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json(updatedMessage);
    } catch (error) {
        console.error('Error editing message:', error);
        res.status(500).json({ error: 'Failed to edit message' });
    }
};

// deleting a message.
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params; // Get message ID from URL params

    try {
        // Find the message by ID and mark it as deleted
        const deletedMessage = await Message.findByIdAndUpdate(
            messageId,
            { isDeleted: true },
            { new: true } // Return the updated message
        );

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json({ message: 'Message deleted successfully', deletedMessage });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};