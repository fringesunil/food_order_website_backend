const Coupon = require("../models/couponModel");

const getAllCoupons = async (req, res) => {
    const coupon= await Coupon.find().exec();
    res.json(coupon)

  }

const getCouponbyid=async (req, res) => {
    const coupon= await Coupon.findById(req.params.couponid).exec();
    res.json(coupon)

  }
  
 const addCoupons = async (req, res) => {
    const data = req.body
    const coupon = new Coupon(data)
    await coupon.save();
    res.json(coupon)

  }
 
 const updateCoupons = async (req, res) => {
    const updatecoupon = await Coupon.findByIdAndUpdate(req.params.couponid, req.body, {new:true})
    res.json(updatecoupon)
  }
  
 const deleteCoupons = async (req, res) => {
    await  Coupon.findByIdAndDelete(req.params.couponid)
    res.send('Delete Successfully')
  }

  module.exports={
    getAllCoupons,
    getCouponbyid,
    addCoupons,
    updateCoupons,
    deleteCoupons
  }