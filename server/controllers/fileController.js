const File = require("../models/fileModel");
const path = require('path');
const multer=require('multer')
const fs=require('fs')

// const {nanoid}=require('nanoid')


function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

const uploadFile = async (req, res) => {
  const userId=req.user
  const  file  = req.file;
  
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const code = generateSixDigitCode()

  const newFile = new File({
   userId,filename: file.originalname,
   filepath: file.path, code
  });
  await newFile.save();
  res.json({ msg: "File uploaded successfully", code});
};

const getUploadedFile = async (req, res) => {
 try {
  const userId = req.user;
  const files = await File.find({ userId });
  res.status(200).json(files);
 } catch (error) {
  res.status(500).json({ message: 'Server error' });
 }
};

const removeFile = async (req, res) => {
  const fileId=req.params;
  const file=await File.findById(fileId)
  if(!file){
    res.status(404).json({msg:"file not found"})
  }
  await File.findByIdAndDelete(id)
  res.status(200).json({msg:"user deleted"})
};


const downloadFile = async (req, res) => {
  const {code } = req.body;
  const file = await File.findOne(code);
  if (file.code !== code) {
    return res.status(403).json({ message: 'Invalid code or file not found' });
  }

  res.download(path.resolve(file.filePath));
  
};

module.exports = { uploadFile, removeFile, getUploadedFile, downloadFile };
