import express from 'express'
import indRoutes from './routes/indexRoutes.js'
import tecRoutes from './routes/TecnicosRoutes.js'
import credRouter from './routes/CredencialesRoutes.js'
import userRouter from './routes/usuariosRoutes.js'
import planesRouter from './routes/planesRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(planesRouter)
app.use(credRouter)
app.use(tecRoutes)
app.use(indRoutes)
app.use(userRouter)
app.use(express.static('public'))

app.use((req, res, next)=>{
    res.status(404).json({
        message: "endpoint not found"
    })
})
app.use(cors)

export default app;