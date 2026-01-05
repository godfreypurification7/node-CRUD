require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors=require('cors'); 
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const app = express();
const authRouter=require('./routers/authRouter');
const postsRouter=require('./routers/postsRouter');
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extends:true}));
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('db connected')
}).catch(err => {
  console.error(err)
});
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Hello World! from server' });
});
app.listen(process.env.PORT, () => {
    console.log('listening......' );
});


// https://www.youtube.com/watch?v=EMv8pc5Xo88 1.54
// https://github.com/Adil1109/Understanding-Authentication-Express/blob/main/controllers/authController.js

