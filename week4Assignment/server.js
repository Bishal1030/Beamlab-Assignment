const express = require('express')
const productRoute = require('./routes/product.routes.js')
const orderRoute = require('./routes/order.route.js')
const adminRoute = require('./routes/admin.route.js')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();


const app = express()


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/admin/', adminRoute)
app.use('/api/v1/products', productRoute)

app.use((req,res,next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
          token = req.headers.authorization.split(" ")[1];
    
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded
          next();
        }
      } catch (error) {
        console.log("you are not verified", error);
      }
})

app.use('/api/v1/orders', orderRoute)


const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})