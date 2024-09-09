require('dotenv').config()
const Order = require("../models/orderModel");
const nodemailer = require('nodemailer');


const getAllOrder = async (req, res) => {
    const order= await Order.find().populate('user_id').populate('menu_id');
    res.json(order)
  }

const getOrderbyid=async (req, res) => {
    const order= await Order.findById(req.params.orderid).exec();
    res.json(order)
  }
  
 const addOrder = async (req, res) => {
    const data = req.body
    const order = new Order(data)
    await order.save();
    const userdetails = await order.populate('user_id')
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_ID, 
        pass: process.env.PASSWORD 
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID, 
      to: userdetails.user_id.email,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your order number is ${order._id}. We will process your order shortly.`
    };

    await transporter.sendMail(mailOptions);
    res.json(order)

  }
 
 const updateOrder = async (req, res) => {
    const updateorder = await Order.findByIdAndUpdate(req.params.orderid, req.body, {new:true})
   res.json(updateorder)
  }
  
 const deleteOrder = async (req, res) => {
    await  Order.findByIdAndDelete(req.params.orderid)
    res.send('Delete Successfully')
  }

  module.exports={
    getAllOrder,
    getOrderbyid,
    addOrder,
    updateOrder,
    deleteOrder
  }