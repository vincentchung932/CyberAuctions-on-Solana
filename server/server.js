const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000
require('./config/mongoose.config')

app.use(cors())
app.use(express.json(),express.urlencoded({extended:true}))
require('./routes/nft.routes')(app)

app.listen(port,()=>console.log(`Server is running on port ${port}`))