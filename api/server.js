const express = require('express')
const app = express()

const path = require('path')
const db = require('./db')

app.use(express.static(path.join(__dirname, '../web')))
app.use(express.json()) // To parse JSON bodies

app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products_joannalucia ORDER BY id DESC')
        res.json(rows)
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
})

app.post('/api/produtos', async (req, res) => {
    try {
        const { nome, preco, descricao, categoria } = req.body
        const [result] = await db.query(
            'INSERT INTO products_joannalucia (nome, preco, descricao, categoria) VALUES (?, ?, ?, ?)',
            [nome, preco, descricao, categoria]
        )
        res.status(201).json({ id: result.insertId, message: 'Produto cadastrado com sucesso' })
    } catch (error) {
        console.error('Error saving product:', error)
        res.status(500).json({ error: 'Erro ao cadastrar produto' })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
