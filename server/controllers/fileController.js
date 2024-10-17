const File = require("../models/fileModel");
const path = require('path');
const multer=require('multer')

// const {nanoid}=require('nanoid')


function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

const uploadFile = async (req, res) => {
  const {userId}=req.user
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
  const Id = req.body;
  const files = await File.find({ Id });
  res.status(200).json(files);
};

const removeFile = async (req, res) => {
  const file = await File.findById(req.params.fileId);
  if (!file || file.userId.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Unauthorized or file not found" });
  }
  await File.findByIdAndDelete(req.params.fileId);
  File.unlinkSync(path.json(__dirname, file.path));
  res.json({ msg: "File removed successfully" });
};

const downloadFile = async (req, res) => {
  const { code } = req.body;
  const file = await File.findOne({ _id: req.params.fileId, code });
  if (!file) {
    return res.status(403).json({ msg: "Invalid code" });
  }
  res.download(file.path, file.filename);
};

module.exports = { uploadFile, removeFile, getUploadedFile, downloadFile };
