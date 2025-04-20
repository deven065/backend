const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index');

const app = express();

app.use(cors({
    origin : "https://paytm-clone-frontend.vercel.app", //replace after frontend deployment
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000);