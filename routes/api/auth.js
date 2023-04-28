const express = require("express");
const  ctrlWrapper  = require("../../helpers/ctrlWrapper");

const {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
  upAvatar,
  verifyEmail,
  repeatVerifyEmail,
} = require("../../controllers/auth.controller");
const {
  authUser,
  upUserSubscription,
} = require("../../validJoi/validUsers");
const { validAuth } = require("../../helpers/validAuth");
const { validToken } = require("../../helpers/validToken");
const { upload } = require ("../../helpers/uploadAvatar");

const authRouter = express.Router();

authRouter.post("/register", validAuth(authUser), ctrlWrapper(register));
authRouter.get("/login", validAuth(authUser), ctrlWrapper(login));
authRouter.post("/logout", ctrlWrapper(validToken), ctrlWrapper(logout));
authRouter.get("/current", ctrlWrapper(validToken), ctrlWrapper(userInfo));
authRouter.patch(
  "/",
  ctrlWrapper(validToken),
  validAuth(upUserSubscription),
  ctrlWrapper(upSubscription)
);
authRouter.post(
  "/avatars",
  ctrlWrapper(validToken),
  upload.single("avatar"),
  ctrlWrapper(upAvatar)
);
authRouter.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
authRouter.post("/verify", ctrlWrapper(repeatVerifyEmail));

module.exports = {
  authRouter,
};