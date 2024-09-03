const express = require('express')
const { getAllOrder, getOrderbyid, addOrder, updateOrder, deleteOrder } = require('../controllers/orderControllers')
const router = express.Router()

router.get('/', getAllOrder)

  router.get('/:orderid',getOrderbyid )

  router.post('/',addOrder )

  router.patch('/:orderid',updateOrder )

  router.delete('/:orderid',deleteOrder )

module.exports = router