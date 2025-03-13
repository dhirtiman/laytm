import express from "express";
import { Account, Txn } from "../schemas/db.js";
import { auth } from "../middleware/middleware.js";
import mongoose, { startSession } from "mongoose";

const accountRouter = express.Router();

const toDecimal = (n) => {
  return (n / 100).toFixed(2);
};

accountRouter.get("/balance", auth, (req, res) => {
  const userid = req.userid;
  Account.findOne({
    userid: userid,
  })
    .then((account) => {
      res.status(200).json({
        balance: toDecimal(account.balance),
      });
    })
    .catch((err) => {
      res.status(411).json({
        message: "Error while fetching balance",
        err,
      });
    });
});

accountRouter.post("/transfer", auth, async (req, res) => {
  const session = await startSession();

  session.startTransaction();

  const { to, amount } = req.body;

  const userid = req.userid;

  const account = await Account.findOne({ userid }).session(session);

  if (!account) {
    session.abortTransaction();
    return res.status(403).json({
      message: "Your Account not found",
    });
  }

  if (account.balance < amount) {
    session.abortTransaction();
    return res.status(403).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userid: to }).session(session);

  if (!toAccount) {
    session.abortTransaction();
    return res.status(403).json({
      message: "Invalid reciever Account",
      to: to,
    });
  }

  await Account.updateOne({ userid }, { $inc: { balance: -amount } }).session(
    session
  );
  await Account.updateOne(
    { userid: to },
    { $inc: { balance: amount } }
  ).session(session);

  await Txn.create(
    [
      {
        to: to,
        from: userid,
        amount: amount,
      },
    ],
    { session }
  );

  session.commitTransaction();

  return res.status(200).json({
    message: "Transfer successful",
    amount: toDecimal(amount),
    to: to,
    from: userid,
  });
});

accountRouter.get("/txns", auth, async (req, res) => {
  const userid = req.userid;
  const userIdObject = new mongoose.Types.ObjectId(userid);

  try {
    const txns = await Txn.find({
      $or: [{ to: userIdObject }, { from: userIdObject }],
    }).limit(10);
    return res.status(200).json({
      txns: txns.map((txn) => {
        return {
          _id: txn._id,
          to: txn.to,
          from: txn.from,
          amount: toDecimal(txn.amount),
          date: txn.date,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(411).json({
      message: "Error while fetching txns",
      err,
    });
  }
});

export default accountRouter;
