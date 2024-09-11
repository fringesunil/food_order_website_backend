const express = require('express')
const { getAllCoupons, getCouponbyid, addCoupons, updateCoupons, deleteCoupons, applyCoupons } = require('../controllers/couponControllers')
const { checkadmin } = require('../middlewares/checkAdmin')
const router = express.Router()

router.get('/', getAllCoupons)

  router.get('/:couponid',getCouponbyid )

  router.post('/',checkadmin,addCoupons )

  router.patch('/:couponid',checkadmin,updateCoupons )

  router.delete('/:couponid',checkadmin,deleteCoupons )

  router.post('/apply-coupon',applyCoupons )

module.exports = router