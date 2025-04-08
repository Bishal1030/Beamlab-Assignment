const express = require('express')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger/swagger.yml')

const productRoute = require('./routes/product.routes.js')
const orderRoute = require('./routes/order.route.js')
const authRoute = require('./routes/auth.route.js')
const register = require('./routes/register.route.js')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


dotenv.config();


const app = express()


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/v1/register/', register)
app.use('/api/v1/', authRoute)
app.use('/api/v1/products', productRoute)


app.use('/api/v1/orders', orderRoute)


const port = process.env.PORT || 3002

console.log("hello world!!")

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})