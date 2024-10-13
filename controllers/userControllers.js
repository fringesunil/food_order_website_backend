
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const { imageUpload } = require("../utils/imageUpload");
const saltRounds = 10;

const getAlluser = async (req, res) => {
    const user= await User.find().exec();
    const response = user.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      image: user.image
    }));
    res.json(response)

  }

const getUserbyid=async (req, res) => {
    const user= await User.findById(req.params.userid).exec();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      image: user.image
    })

  }
  
 const addUser = async (req, res) => {
  let imageUrl;
    const data = req.body
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const hashconfpas =bcrypt.hashSync(req.body.confirm_password, saltRounds);
    if(req.file){
       imageUrl=await imageUpload(req.file.path);
    }
    const user = new User({...data,
        password: hash,
        confirm_password:hashconfpas,
        image:imageUrl
    })
    if(req.body.password != req.body.confirm_password){
      return res.status(401).json({ message: 'Password Mismatch' });
    }
    await user.save();
    res.json({
      _id:user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      image: user.image
    })

  }
 
 const updateUser = async (req, res) => {
    if(req.file){
       let imageUrl=await imageUpload(req.file.path);
        req.body.image=imageUrl;
    }
    const updateuser = await User.findByIdAndUpdate(req.params.userid, req.body, {new:true})
    res.json(updateuser)
  }
  
 const deleteUser = async (req, res) => {
    await  User.findByIdAndDelete(req.params.userid)
    res.send('Delete Successfully')
  }

  module.exports={
        getAlluser,
        getUserbyid,
        addUser,
        updateUser,
        deleteUser,
  }