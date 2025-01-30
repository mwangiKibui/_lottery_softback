const mongoose = require("mongoose");
const db = require("../../models");
const Ticket = db.ticket;
const User = db.user;

// Read
exports.getTicket = async (req, res) => {
  try {
    const { fromDate, toDate, lotteryCategoryName, seller } = req.query;
    const query = { isDelete: false };
    const supervisor = req.user.userName;
    query.date = { $gte: fromDate, $lte: toDate };

    if (seller == "") {
      const sellers = await User.find({ superVisorName: supervisor }, { _id: 1 });
      let sellerIds = [];
      sellers.map((item) => {
        sellerIds.push(item._id);
      });
      query.seller = { $in: sellerIds };
    } else {
      query.seller = mongoose.Types.ObjectId(seller);
    }

    if (lotteryCategoryName != "") {
      query.lotteryCategoryName = lotteryCategoryName;
    }
    const ticketsObj = await Ticket.find(query).sort({
      lotteryCategoryName: 1,
      date: 1,
    });
    res.send({ success: true, data: ticketsObj });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};