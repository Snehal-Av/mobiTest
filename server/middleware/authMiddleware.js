const jwt = require("jsonwebtoken");
const UserModel = require("../models/userAuthModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  const jwtToken = token.replace("Bearer","").trim();
  console.log(jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRETE_KEY);
    console.log(isVerified);
   
    // const userData = await UserModel.findOne({ email: isVerified.email }).select({
    //   password: 0,
    // });
    req.user=isVerified.user
   
    
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
module.exports = authMiddleware;
