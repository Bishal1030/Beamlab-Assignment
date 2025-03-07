const express = require('express')
const route = require('./routes/product.routes.js')
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/', route)


const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})