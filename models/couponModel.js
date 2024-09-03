const { default: mongoose } = require("mongoose");


const couponSchema = new mongoose.Schema({
  coupon_code:String,
  discount_percentage:String,
  exp_date: String,
  usage_limit:String
  });
  

  const Coupon = mongoose.model('Coupon', couponSchema);

  module.exports=Coupon
