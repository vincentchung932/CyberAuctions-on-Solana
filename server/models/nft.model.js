const mongoose=require("mongoose")

const NFTSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    time_left:{
        type:Number,
        default: 0
    },
    price:{
        type:Number,
        default: 0
    },
    
    json_file:{
        type:Object,
        required:[true,"json_file is required"]
    },

    isOnMarket:{
        type:Boolean,
        default:false
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    isFollowed:{
        type:Boolean,
        default:false
    }



},{timestamps:true})

module.exports.NFTs = mongoose.model("NFTs",NFTSchema)