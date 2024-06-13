const express = require('express');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
// const indexRoute = require('./server/Route/indexRoute');
// const userRoute = require('./server/Route/userRoute');
// const adminRoute = require('./server/Route/adminRoute');
const { requireAuth, checkUser } = require('./server/authMiddleware/authMiddleware');


const app = express();
const port = 4500 || process.env.PORT;


//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


// set view engine
app.set('view engine', 'ejs');

//db connection
const dbUrl = 'mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/masitrade';
mongoose.connect(dbUrl)
.then(() =>{
    app.listen(port, () =>{
        console.log(`app is listening ${port}`)
    })
})
.catch((error) =>{
    console.log(error);
});

// app.get('*', checkUser);
// app.use('/', requireAuth, require );
// app.use('/',requireAuth, userRoute);
// app.use('/', requireAuth, adminRoute);

app.get('*', checkUser);
app.use('/', require('./server/Route/indexRoute'));
app.use('/',requireAuth, require('./server/Route/userRoute'));
app.use('/', require('./server/Route/adminRoute'));



