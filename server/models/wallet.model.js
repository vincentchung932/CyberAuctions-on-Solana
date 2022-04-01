const mongoose=require("mongoose")

const WalletSchema = new mongoose.Schema({
    public_key:{
        type:String,
        required:[true, "public_key is required"]
    },
    
    nft_meta:{
        type:Array,
        required:[true,"nft_meta is required"]
    },

    token:{
        type:Number,
        default:false
    }



},{timestamps:true})

module.exports.Wallets = mongoose.model("Wallets",WalletSchema)