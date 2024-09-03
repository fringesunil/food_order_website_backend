const express = require('express')
const { addRestuarants, getAllRestuarants, getRestuarantsbyid, updateRestuarants, deleteRestuarants } = require('../controllers/restaurantsControllers')
const { checkadmin } = require('../middlewares/checkAdmin')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.get('/', getAllRestuarants)

  router.get('/:restaurantsid',getRestuarantsbyid )

  router.post('/',checkadmin,upload.single("image"),addRestuarants )

  router.patch('/:restaurantsid',checkadmin,upload.single("image"),updateRestuarants )

  router.delete('/:restaurantsid',checkadmin,deleteRestuarants )

module.exports = router