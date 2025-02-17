import express from "express";
import { z } from "zod";
import { User, Account } from "../schemas/db.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/middleware.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const updateBody = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  // artificial delay 


  const body = req.body;

  const { success } = signupBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      msg: signupBody.safeParse(body),
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  const user = await User.create(body);
  const userid = user._id;

  // acount creation

  const acount = await Account.create({
    userid,
    balance: (1 + Math.random() * 1000000).toFixed(0),
  });

  const token = jwt.sign({ userid }, JWT_SECRET);

  return res.status(200).json({
    msg: "successfully created user man",
    token,
  });
});

userRouter.post("/signin", async (req, res) => {

  const body = req.body;
  const { success } = signinBody.safeParse(body);

  if (!success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (!user) {
    return res.status(403).json({
      message: "User not found",
    });
  }

  const isPasswordCorrect = await user.comparePassword(body.password);

  if (!isPasswordCorrect) {
    return res.status(411).json({
      msg: "incorrect password",
    });
  }
  const userid = user._id;

  const token = jwt.sign({ userid }, JWT_SECRET);

  return res.status(200).json({
    msg: "successfully logged in",
    token,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

userRouter.put("/", auth, async (req, res) => {
  const body = req.body;
  if (body) {
    const { success } = updateBody.safeParse(body);
    if (success) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      const user = await User.updateOne({ _id: req.userid }, body);
      return res.status(200).json({
        msg: "updated successfully",
      });
    }
  }

  return res.status(411).json({
    msg: "error while updating",
  });
});

userRouter.get("/bulk", auth, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  return res.status(200).json({
    users: users
    .filter((user)=>user._id != req.userid)
    .map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }),
  });
});

userRouter.get("/wake",  async (req, res) => {
  return res.status(200).json({
    msg: "hello, the server wake up",
  });
});

export default userRouter;
