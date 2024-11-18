import express from 'express'
import empRoutes from './routes/employeesRoutes.js'
import indRoutes from './routes/indexRoutes.js'
import tecRoutes from './routes/TecnicosRoutes.js'
import credRouter from './routes/CredencialesRoutes.js'
import userRouter from './routes/usuariosRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())


app.use(credRouter)
app.use(tecRoutes)
app.use(empRoutes)
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