const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect('mongodb://cyclesafer:cyclesafer123@ds139954.mlab.com:39954/makecyclesafer')

app.use(morgan("dev")); //console logs
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/public', express.static('./public'));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow CORS
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

const incidentReportRoutes = require("./api/routes/incidents");
app.use("/api/incidents", incidentReportRoutes);

//404 not found
app.use((req,res,next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

//error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        errors : {
            message : error.message
        }
    }); 
});

module.exports = app;