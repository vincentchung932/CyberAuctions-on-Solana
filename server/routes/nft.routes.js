const NFTController = require('../controllers/nft.controllers')
const WalletController = require('../controllers/wallet.controller')

module.exports = function(app){
    app.post('/api/nfts/new',NFTController.createOne)
    app.get('/api/nfts/isonmarket',NFTController.getAll_isonmarket)
    app.get('/api/nfts/followed',NFTController.getAll_followed)
    app.get('/api/nfts',NFTController.getAll)
    app.get('/api/nfts/:id',NFTController.getOne)
    app.put('/api/nfts/:id',NFTController.updateOne)
    app.delete('/api/nfts/:id',NFTController.deleteOne)


    app.post('/api/wallet/new',WalletController.createOne)
    app.get('/api/wallet',WalletController.getAll)
    app.delete('/api/wallet/:id',WalletController.deleteOne)
}

