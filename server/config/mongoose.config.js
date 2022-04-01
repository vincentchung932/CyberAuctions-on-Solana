const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/nft_test',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>console.log("DB connection established"))
    .catch(err=>console.log('there is an error:',err))