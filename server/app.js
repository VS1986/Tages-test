require('dotenv').config();
require('@babel/register');
const axios = require('axios')


const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const apiRouter = require('express').Router()

const app = express();
const PORT = process.env.PORT

app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

apiRouter.get('/', async (req, res) => {
    try {
        const [usersData, postsData] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('http://jsonplaceholder.typicode.com/posts'),
          ]);
        res.json({users: usersData.data, posts: postsData.data})
    } catch (error) {
        console.log(error)
    }
})

app.use('/', apiRouter)

app.listen(PORT, () => {
    console.log(`Server starting on PORT ${PORT}`);
  });