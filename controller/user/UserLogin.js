const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (err) {
      return res.json({
        RESULT: 500,
        MESSAGE: "내부 오류 발생",
      });
    }
    if (!userInfo) {
      return res.status(200).json({
        RESULT: 400,
        MESSAGE: "이메일에 해당하는 유저가 없습니다.",
      });
    }
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(200).json({
          RESULT: 401,
          MESSAGE: "비밀번호가 틀렸습니다.",
        });
      } else {
        userInfo.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("x_auth", user.token).status(200).json({
            RESULT: 200,
            MESSAGE: "로그인 성공",
            userId: user._id,
          });
        });
      }
    });
  });
};

module.exports = login;
