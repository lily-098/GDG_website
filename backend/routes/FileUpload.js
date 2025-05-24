const express=require("express");
const router=express.Router();
const {imageUpload,videoUpload,imageReducerUpload,localFileUpload, generalFileUpload}=require("../controllers/fileUpload");
const { fetchFile } = require("../controllers/fetchFiles");
 //api route 
 router.post("/localFileUpload",localFileUpload);
 router.post("/imageUpload",imageUpload);
 router.get('/fetchfile',fetchFile);
 module.exports=router;