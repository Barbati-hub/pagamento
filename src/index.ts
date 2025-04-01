import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import produtosRouter from './routes/produtos'
import pagamentosRouter from './routes/pagamentos'
import { config } from './config'

dotenv.config()

const app = express()

// Configuração do CORS mais explícita
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())

// Rotas
app.use('/produtos', produtosRouter)
app.use('/pagamentos', pagamentosRouter)

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
