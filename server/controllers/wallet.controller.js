const {Wallets} = require("../models/wallet.model")

module.exports.createOne=(req,res)=>{
    const {public_key,nft_meta,token} = req.body
    Wallets.create({
        public_key,nft_meta,token
    })
        .then(nft=>res.json(nft))
        .catch(err => res.status(400).json(err))
}


module.exports.getAll=(req,res)=>{
    Wallets.find({})
        .then(wallets=>res.json(wallets))
        .catch(err => res.json(err))
}


module.exports.deleteOne=(req,res)=>{
    Wallets.deleteOne({_id:req.params.id})
        .then(wallet=>res.json(wallet))
        .catch(err => res.json(err))
}