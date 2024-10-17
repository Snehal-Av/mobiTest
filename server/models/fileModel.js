const { default: mongoose } = require('mongoose');

const fileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Authuser'
    },
    filename:{
        type:String
    },
    code:{
        type:String,
    },
    path:{
        type:String
    }
})

const File=new mongoose.model('File',fileSchema)

module.exports=File

