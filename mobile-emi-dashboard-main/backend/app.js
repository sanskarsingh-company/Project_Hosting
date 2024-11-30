const express = require('express');
const app = express();
require('dotenv').config();
const path = require("path");

require("./db/conn"); 
const router = require('./routes/router')
const team = require('./routes/teams')
const auth = require('./routes/auth').router


app.use(express.json())
app.use(router);
app.use(team);
app.use(auth);

let Port = process.env.PORT;

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.listen(Port, () => {
    console.log(`App Listing on ${Port}`);
}) 