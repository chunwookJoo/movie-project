const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({
        RESULT: 500,
        MESSAGE: "내부에러",
        error: err,
      });
    } else {
      return res.status(200).send({
        RESULT: 200,
        MESSAGE: "로그아웃 성공",
      });
    }
  });
};

module.exports = logout;
