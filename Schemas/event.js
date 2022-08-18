const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  location: {
    type: [Number],
    required: true
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now(),
    // validate: [validator.isAfter, 'Please provide a valid date']
  },
  end_date: {
    type: Date,
    // required: true,
    default: Date.now()+7200000,
  },
  max_slots: {
    type: Number,
    required: true,
    default: 20
  },
  no_registered: {
    type: Number,
    required: true,
    default: 0
  },
  user_registered: {
    type: [mongoose.Types.ObjectId],
    ref: "Users",
    default: []
  },
  event_type: {
    type: String,
    enum: ['Talk', 'Workshop'],
    default: 'Talk'
  },
  waitlist: {
    type: [mongoose.Types.ObjectId],
    ref: "Users",
    default: []
  }
});



// // To check if the event date is greater than now
eventSchema.pre('save', function(next) {
  try {
    const event = this;
    console.log(typeof(Date(event.start_date)));
    if(Date(event.start_date)<Date.now()) {
      return next(new Error('Please provide a valid date'));
    }
    return next();
  } catch (error) {
    return next(error);
  }

});


const Events = mongoose.model('Events', eventSchema);
module.exports = Events;
