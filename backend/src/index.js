import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.js'
import aiRouter from './routes/ai.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))
app.use(express.json())

app.use('/health', healthRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`)
})
