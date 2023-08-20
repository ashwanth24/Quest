import express from 'express'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import authRoutes from './routes/auth.js'

import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()
app.use(express.json())
app.use(morgan("tiny"))
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.listen(5000,()=>{
    console.log("connected")
})
app.post("/api/upload",upload.single('file'),function(req,res){
    const file = req.file;
    res.status(200).json(file.filename)
})
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)

