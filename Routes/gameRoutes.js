const router = require('express').Router()
const Game = require('../Models/Game')

router.post('/', async (req, res) => {

    const { title,  description, price, qtd, company } = req.body

    const game = {
        title,
        description,
        price,
        qtd,
        company
    }

    if(!title) {
        res.status(422).json({message: "O Campo titulo é obrigat"})
    } else {

        try {
            
            await Game.create(game)
            res.status(201).json({message: "Game adcionado com sucesso!"})
    
        } catch (error) {
            res.status(500).json({Erro: error})
        }
    }

    
})

router.get('/', async (req, res) => {
    try {

        const games = await Game.find()

        res.status(200).json( games)
    } catch (error) {
        res.status(500).json({Erro: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const game = await Game.findOne({_id: id})

        if (!game) {
            res.status(422).json({message: "Usuário não encontrado :("})
            return
        }

        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({Erro: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { title,  description, price, qtd, company, image } = req.body

    const game = {
        title,  
        description, 
        price, 
        qtd, 
        company,
        image
    }
    try {

        const updateGame = await Game.updateOne({_id: id}, game)

        if (updateGame.matchedCount === 0) {
            res.status(422).json({Erro: error})
            return
        }

        res.status(200).json(game)

    } catch (error) {
        res.status(500).json({Erro: error})
    }
})

router.delete ('/:id', async (req, res) => {
    const id = req.params.id 
    
    const game = await Game.findOne({_id: id})
    if (!game) {
        res.status(422).json({message: "Game não encontrado :("})
        return
    }

    try {
        await Game.deleteOne({_id: id})

        res.status(200).json({message: "Game Excluído!"})
    } catch (error) {
        res.status(422).json({message: "Game não encontrado :("})
    }
})

module.exports = router