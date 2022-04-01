const {NFTs} = require("../models/nft.model")

module.exports.createOne=(req,res)=>{
    const {name,time_left,json_file,price,isOnMarket,isFavorite,isFollowed} = req.body
    NFTs.create({
        name,time_left,json_file,price,isOnMarket,isFavorite,isFollowed
    })
        .then(nft=>res.json(nft))
        .catch(err => res.status(400).json(err))
}

module.exports.getAll_followed=(req,res)=>{
    NFTs.find({isFollowed:true}).sort({isOnMarket:-1,isFavorite:-1})
        .then(nfts=>res.json(nfts))
        .catch(err => res.json(err))
}

module.exports.getAll=(req,res)=>{
    NFTs.find({}).sort({isOnMarket:-1,isFavorite:-1})
        .then(nfts=>res.json(nfts))
        .catch(err => res.json(err))
}





module.exports.getAll_isonmarket=(req,res)=>{
    NFTs.find({isOnMarket:true,isFollowed:true}).sort({isFavorite:-1})
        .then(nfts=>res.json(nfts))
        .catch(err => res.json(err))
}

module.exports.getOne=(req,res)=>{
    NFTs.findOne({_id:req.params.id})
        .then(nft=>res.json(nft))
        .catch(err => res.json(err))
}

module.exports.updateOne=(req,res)=>{
    NFTs.updateOne({_id:req.params.id},req.body,{new:true, runValidators:true})
        .then(nft=>res.json(nft))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteOne=(req,res)=>{
    NFTs.deleteOne({_id:req.params.id})
        .then(nft=>res.json(nft))
        .catch(err => res.json(err))
}