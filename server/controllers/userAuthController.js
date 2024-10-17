const UserModel = require("../models/userAuthModel");
// const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userExist = await UserModel.findOne({ email });
    console.log(userExist);

    if (userExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const userCreated = await UserModel.create({ email, password });
    res
      .status(200)
      .json({
        msg: "Register Successfully",
        userCreated,
        token:await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({ email });
    if  (!userExist ) {
      return res.status(401).send({ message: "Invalid Credidentail" });
    } 

      res
        .status(200)
        .send({
          msg: "login successful",
          token: userExist.generateToken(),
          userId: userExist._id.toString(),
        });
    
  } catch (error) {
    console.log(error);
  }
};

// const dashUser=async(req,res)=>{
//   try {
//       const userData=req.user
//   console.log(userData)
//   return res.status(200).json({msg:userData})
//   } catch (error) {
//       console.log(error);
      
//   }
// }
module.exports = { register, logIn };
