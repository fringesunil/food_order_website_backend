const Coupon = require("../models/couponModel");
const Cart = require("../models/cartModel");

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
    const extcoupon = await Coupon.findOne({coupon_code: data.coupon_code})
    if(extcoupon){
      return res.status(401).json({ message: 'Coupon code already exist' });
    }
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

  const applyCoupons = async (req, res) => {
    const { cartId, couponCode } = req.body;
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      const coupon = await Coupon.findOne({ coupon_code: couponCode });
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      if (new Date() > coupon.exp_date) {
        return res.status(400).json({ message: 'Coupon is expired' });
      }
      const discountAmount = (cart.total_amount * coupon.discount_percentage) / 100;
      const finalPrice = cart.total_amount - discountAmount;
      cart.discount = discountAmount;
      cart.total_amount = finalPrice;
      cart.gst_amount = (finalPrice*18/100)
  
      await cart.save();
  
      res.status(200).json({
        message: 'Coupon applied successfully',
        discountAmount,
        finalPrice,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  
  }

  module.exports={
    getAllCoupons,
    getCouponbyid,
    addCoupons,
    updateCoupons,
    deleteCoupons,
    applyCoupons
  }