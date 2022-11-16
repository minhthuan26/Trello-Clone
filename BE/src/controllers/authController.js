const User = require("../models/User");
const UserGoogle = require("../models/UserGoogle");
const Refresh = require("../models/Refresh");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class AuthController {
  ReplaceRefreshInDB = async (userId, refreshToken) => {
    const oldRefreshToken = await Refresh.findOne({ createBy: userId });
    if (oldRefreshToken) {
      await Refresh.findOneAndUpdate(
        {
          createBy: userId,
        },
        {
          key: refreshToken,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await Refresh.create({
        key: refreshToken,
        createBy: userId,
      });
    }
  };

  Register = async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ msg: "Username, password and email could not be null!" });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
          username,
          password: passwordHash,
          email,
        });
        // const { password, ...others } = newUser._doc
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  };

  GenerateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30s" }
    );
  };

  GenerateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_KEY,
      { expiresIn: "356d" }
    );
  };

  Login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Username and password could not be null!" });
    } else {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return res.status(404).json({ msg: "Wrong password" });
          } else {
            const accessToken = this.GenerateAccessToken(user);
            const refreshToken = this.GenerateRefreshToken(user);
            this.ReplaceRefreshInDB(user.id, refreshToken);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "strict",
              path: "/",
              secure: false,
            });

            const { password, ...others } = user._doc;
            return res.status(200).json({ ...others, accessToken });
          }
        }
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  };

  Refresh = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ msg: "Unauthentic" });
    }
    if (!(await Refresh.findOne({ refreshToken }))) {
      return res.status(403).json({ msg: "Token is not valid" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_KEY, async (error, user) => {
      if (error) {
        return res.status(403).json({ msg: error.message });
      }
      const newAccessToken = this.GenerateAccessToken(user);
      const newRefreshToken = this.GenerateRefreshToken(user);
      await Refresh.findOneAndUpdate(
        {
          createBy: user.id,
        },
        {
          key: newRefreshToken,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: false,
      });
      return res.status(200).json(newAccessToken);
    });
  };

  Logout = async (req, res, next) => {
    await Refresh.findOneAndDelete(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "Logged Out" });
  };

  LoginWithGoogle = async (req, res, next) => {
    const existedUserGoogle = await UserGoogle.findOne({
      providerid: req.providerId,
    });
    //da tung dang nhap bang gg
    if (existedUserGoogle) {
      try {
        const user = await User.findById(existedUserGoogle.userid);
        const refreshToken = this.GenerateRefreshToken(user);
        const accessToken = this.GenerateAccessToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          secure: false,
        });
        const { password, ...others } = user._doc;
        this.ReplaceRefreshInDB(existedUserGoogle.userid, refreshToken);

        return res.status(200).json({ ...others, accessToken });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    } else {
      const existedUser = await User.findOne({ email: req.user.email });
      //chua dang nhap bang gg nhung co ton tai email trong tai khoan
      if (existedUser) {
        try {
          await UserGoogle.create({
            providerkey: req.providerId,
            userid: existedUser.id,
          });
          const refreshToken = this.GenerateRefreshToken(existedUser);
          const accessToken = this.GenerateAccessToken(existedUser);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            secure: false,
          });
          this.ReplaceRefreshInDB(existedUserGoogle.userid, refreshToken);
          const { password, ...others } = existedUser._doc;
          return res.status(200).json({ ...others, accessToken });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }
      //chua tung dang nhap bang gg va chua ton tai tai khoan
      else {
        try {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(req.user.password, salt);
          const newUser = await User.create({
            username: req.user.username,
            password: passwordHash,
            email: req.user.username,
          });
          await UserGoogle.create({
            providerid: req.providerId,
            userid: newUser.id,
          });
          const refreshToken = this.GenerateRefreshToken(newUser);
          const accessToken = this.GenerateAccessToken(newUser);
          this.ReplaceRefreshInDB(existedUserGoogle.userid, refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            secure: false,
          });
          const { password, ...others } = newUser._doc;
          return res.status(201).json({ ...others, accessToken });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }
    }
  };
}

module.exports = new AuthController();
