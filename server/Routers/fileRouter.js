const express=require('express')
const { uploadFile, getUploadedFile, removeFile, downloadFile } = require('../controllers/fileController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const filerouter=express.Router()
const fs = require('fs')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const uploadPath='uploads/';
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath)
        }
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>(null,`${Date.now()}-${file.originalname}`)
});



const upload=multer({storage});

filerouter.post("/upload",upload.single('file'),uploadFile)

filerouter.get("/getfile",getUploadedFile)

filerouter.delete("/removefile/:id",authMiddleware,removeFile)

filerouter.get("/download/:id",authMiddleware,downloadFile)

module.exports=filerouter