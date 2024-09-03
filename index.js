require('dotenv').config()
const express = require('express')
const restaurantsRoutes = require(`./routes/restaurantsRoutes`)
const menuRoutes = require(`./routes/menuRoutes`)
const cartRoutes = require(`./routes/cartRoutes`)
const orderRoutes = require(`./routes/orderRoutes`)
const userRoutes = require(`./routes/userRoutes`)
const authRoutes =require(`./routes/authRoutes`)
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use('/restaurants', restaurantsRoutes)
app.use('/menu',menuRoutes)
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes)
app.use('/user',userRoutes)
app.use('/auth',authRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



main().then(()=> console.log("Connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATA_BASE_URL);
}
