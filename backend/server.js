import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

dotenv.config()
connectDB();


const port = process.env.PORT || 5000 ;
import complaintRoutes from './routes/complaintRoutes.js'
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
    // allow all to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/complaints', complaintRoutes);
app.get('/', (res, req) => res.send('Srever is on'))
app.listen(port, ()=>console.log(`listening on port ${port}`))
