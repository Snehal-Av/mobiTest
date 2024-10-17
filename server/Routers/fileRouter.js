const express=require('express')
const { uploadFile, getUploadedFile, removeFile, downloadFile } = require('../controllers/fileController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const filerouter=express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>(null,`${Date.now()}-${file.originalname}`)
});



const upload=multer({storage});

filerouter.post("/upload",upload.single('file'),uploadFile)

filerouter.get("/getfile",authMiddleware,getUploadedFile)

filerouter.delete("/removefile/:id",authMiddleware,removeFile)

filerouter.get("/download",authMiddleware,downloadFile)

module.exports=filerouter