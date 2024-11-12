const express = require('express')
const { getAllMenu, getMenubyid, addMenu, updateMenu, deleteMenu } = require('../controllers/menuControllers')
const { checkadmin } = require('../middlewares/checkAdmin')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.get('/',getAllMenu)

  router.get('/:menuid',getMenubyid )

  router.post('/',checkadmin,upload.single("image"),addMenu )

  router.patch('/:menuid',checkadmin,upload.single("image"),updateMenu )

  router.delete('/:menuid',checkadmin,deleteMenu )

module.exports = router