import express from "express";
import { Account } from "../schemas/db.js";
import { auth } from "../middleware/middleware.js";
import { startSession } from "mongoose";

const accountRouter = express.Router();

accountRouter.get("/balance", auth, (req, res) => {
  const userid = req.userid;
  Account.findOne({
    userid: userid,
  })
    .then((account) => {
      res.status(200).json({
        balance: account.balance,
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
      messsage: "Your Account not found",
    });
  }

  if (account.balance < amount) {
    session.abortTransaction();
    return res.status(403).json({
      messsage: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userid: to }).session(session);

  if (!toAccount) {
    session.abortTransaction();
    return res.status(403).json({
      messsage: "Invalid reciever Account",
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

  session.commitTransaction();

  return res.status(200).json({
    message: "Transfer successful",
    amount: amount,
    to: to,
    from: userid,
  });
});

export default accountRouter;


