const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// connect with mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8qtckg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('Heliverse Assignment Server is Running');
})
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log("Server Is Running On Port", port);
})