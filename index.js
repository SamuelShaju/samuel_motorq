const mongoose = require('mongoose');
require('dotenv').config()


const app = require('./app');


// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    }).then(() => console.log('DB connection successful!'));
};

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('DB connection successful!'));



 
const port = process.env.PORT || 3000;

app.listen(port, () => 
    DB()
        .then(() => {
            console.log("Server Started")
        })
        .catch((err) => {
            console.log("Server Started with error in DB connection", err)
}));
