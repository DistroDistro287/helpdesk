import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import path from 'path'

dotenv.config()
connectDB();


const port = process.env.PORT || 5000 ;
import complaintRoutes from './routes/complaintRoutes.js'
const app = express();

app.use(cors());
app.use(bodyParser.json());

// CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/complaints', complaintRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (res, req) => res.send('Srever is on'))

}

const router = express.Router();

app.listen(port, ()=>console.log(`listening on port ${port}`))
