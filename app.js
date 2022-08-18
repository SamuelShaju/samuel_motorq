const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoute');

// Start express app
const app = express();

app.enable('trust proxy');


// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(express.static('public'));

// 
// app.get('/', function(req, res) {
//     res.sendFile('public/Login.html', {root: __dirname })
// });


// 3) ROUTES
app.use('/', userRoutes)
app.use('/events', adminRoutes)

module.exports = app;
