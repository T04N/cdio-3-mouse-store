const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOOSEDB_URL)
    .then(() => console.log('CONNECT MONGOOSE SUCCESS!'))
    .catch((err) => console.error('CONNECT MONGOOSE FAILED!', err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

app.listen(8000, () => {
    console.log(`SERVER IS RUNNING! http://localhost:8000`);
});
