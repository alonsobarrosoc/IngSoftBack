const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')



// middlewares
const app = express()
app.use(
  cors({
    origin: ["http://localhost:3000", 'http://127.0.0.1:3000', 'http://127.0.0.1:4173'],
    credentials: true
  })
)
require('dotenv').config()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  let link = req.get("Referrer");
  if (link !== undefined) {
    link = link.substring(0, link.length - 1);
    console.log(link);
    res.header("Access-Control-Allow-Origin", link);
  }
  next();
});

app.get('/api/test', (req, res) => {
  res.status(200).json({msg: "This is a testing endpoint"})
})


app.use('/api/user', require('./Routes/user'))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`App working in port ${port}`);
})
