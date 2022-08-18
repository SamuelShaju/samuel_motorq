const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../Schemas/user');
const Events = require('../Schemas/event');
const { route } = require('../app');

const router = express.Router();



const login = (async (req, res, next) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
      return new Error('Please provide email and password!', 400);
      }
      
      const user = await User.findOne({ email }).select('+password');

      const isCorrectPass = (await bcrypt.compare(password, user.password));
      console.log(isCorrectPass);
      if(!isCorrectPass){

          return next(new Error('Incorrect password!', 401));
      }


        req.header.authorization = user.role;
        req.header.email = user.email;

        res.locals.user = user;

      return res.status(200).json({
      mess: user
      });
  }
  catch (error) {
      return res.status(500).json({ error: error.message });
  }
  next();
});


const signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            ...req.body
        });
        res.status(200).json({
          mess: newUser
        })
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getAllEvents = (async (req, res, next) => {
    try {
    const doc = await Events.find();

  // SEND RESPONSE
  // console.log(doc);
    res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });

} catch (error) {
    return res.status(500).json({ error: error.message });
}
next();
});

const test = async(req, res) => {
    res.status(200).json({
        mess: "Samuel"
    })
}


router.route('/')
router.get('/', getAllEvents);
router.post('/register', signup);
router.post('/login', login);



module.exports = router;
