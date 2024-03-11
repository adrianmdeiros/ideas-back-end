import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'

const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: 'https://projif.vercel.app',
    optionsSuccessStatus: 200
}

app.get('/', (req, res) => res.send('PROJIF-API'))

app.use(express.json())
app.use(cors(corsOptions))     
app.use(routes)
app.use(errorMiddleware)

app.listen(port, () => {
    console.clear()
    console.log(`Server is running on port ${port} 🚀`)
})