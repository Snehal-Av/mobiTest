const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
})

userSchema.pre('save',async function(next){
 const user=this;
 if(!user.isModified("password")){
    next()
 }
 const saltround=await bcrypt.genSalt(10)
    const hash_password=await bcrypt.hash(user.password,saltround)
    user.password=hash_password;
})
userSchema.methods.generateToken=function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email
        },
        process.env.SECRETE_KEY,
        {
            expiresIn:'30d'
        }
    )
    } catch (error) {
        console.log(error);
        
    }
}

const UserModel=new mongoose.model("Authuser",userSchema)

module.exports=UserModel