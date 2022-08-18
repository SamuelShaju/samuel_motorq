const express = require('express');

const User = require('../Schemas/user');
const Events = require('../Schemas/event');
const { route } = require('../app');
const { findByIdAndUpdate } = require('../Schemas/user');

const router = express.Router();




const createEvent = (async (req, res, next) => {
    // console.log(req.header.authorization);
    console.log("create");
  if(req.header.authorization=='admin'){
    try{
      // console.log(req.body);
      const doc = await Events.create(req.body);
      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
      }
  }
  else {
    return res.status(403).json({ error: "Unauthourized access" });
  }
  next();
});

const modifyEvent = (async (req, res, next) => {

  if(req.header.authorization=='admin'){
  
    try{
      const doc = await Events.create(req.body);
      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
      }
  }
  else {
    return res.status(403).json({ error: "Unauthourized access" });
  }

  next();


});


const registerEvent = async (req, res, next) => {
  try{
    // console.log("Why");
    // console.log(req.header.user);
    const user = await User.findOne({email : req.header.email });
    const event = await Events.findOne({_id: req.params.eventId});
    
    if(!user || !event) {
      return res.status(404).json({ error: "User or Event not found" });
    }


    // Check for time clash
    let popu = await user.populate({path: 'registered', select: 'start_date'});
    popu = popu.registered;

    for(let i=0; i<popu.length; i++){
      if(popu[i].start_date>event.start_date && popu[i].start_date<event.end_date){
        return res.status(409).json({
          error: "You have a time clash with another event"
        });
      }
    }




    if(event.user_registered.includes(user._id) || event.waitlist.includes(user._id)){
      return res.status(403).json({ error: "You have already registered for this Event" });
    }



    if(event.max_slots<=event.no_registered) {
      let waitlist = event.waitlist;
      waitlist.push(user._id);


      let waiting = user.waiting;
      waiting.push(event._id);

    

      await User.findByIdAndUpdate(user._id, {waiting});
      await Events.findByIdAndUpdate(event._id, {waitlist});

      // event.waitlist.push(user._id);
      // user.waiting.push(event._id);
    }
    else {
      let user_registered = event.user_registered;
      user_registered.push(user._id);

      let registered = user.registered;
      registered.push(event._id);

      u = await User.findByIdAndUpdate(user._id, {registered});
      e = await Events.findByIdAndUpdate(event._id, {user_registered, no_registered: event.no_registered+1});


      // event.user_registered.push(user._id);
      // user.registered.push(event._id);
      // event.no_registered = event.no_registered + 1;
    }


    // await user.save();
    // await event.save();
    
    res.status(200).json({ mess: "You have been added" });

    

  } catch (error) {
    return res.status(500).json({ error: error.message });
}
next();
}

const deregisterEvent = async (req, res, next) => {
  try{
    const user = await User.findOne({email : req.header.email });
    const event = await Events.findOne({_id: req.params.eventId});

    if(!user || !event) {
      return res.status(404).json({ error: "User or Event not found" });
    }


    if(event.user_registered.includes(user._id)){
       event.user_registered.pop(user._id);
       user.registered.pop(event._id);
       
       await User.findByIdAndUpdate(user._id, {registered: user.registered});
       
       if(event.waitlist) {
         const waiter = event.waitlist[0];
         event.waitlist.pop(waiter);
         event.user_registered.push(waiter);
         
         const waiter_user = await User.findById(waiter);
        //  waiter_user.waiting.pop(event._id);
        //  waiter_user.registered.push(event._id);


        let waiter_list = waiter_user.waiting;
        let waiter_reg_list = waiter_user.registered;

        waiter_reg_list.push(event._id);
        waiter_list.pop(event._id);

        const x = await User.findByIdAndUpdate(waiter, {waiting:waiter_list, registered:waiter_reg_list});
         
         
        //  const doc = await waiter_user.save();
        //  console.log("doc");
         await event.save();
         
        }
         else 
         { 
          event.no_registered = event.no_registered - 1;
         }



       res.status(200).json({
        mess: "You have been deregistered"
       });
    }
    else if(event.waitlist.includes(user._id))
    {
      event.waitlist.pop(user._id);
      user.waiting.pop(event._id);
      res.status(200).json({
       mess: "You have been removed from waitlist"
      });
    }
    else {
      return res.status(403).json({ error: "You are not registered for this event" });
    }



    await user.save();
    await event.save();
    
    res.json({
        user, event
    })
    


  } catch (error) {
    return res.status(500).json({ error: error.message });
}
next();
}



const deleteEvent = (async (req, res, next) => {
console.log(req.params.eventId);

  if(req.header.authorization=='admin'){
    try{
      const doc = await Events.findByIdAndDelete(req.params.eventId);
  
      if (!doc) {
          return next(new Error('No document found with that ID', 404));
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
  
    res.status(204).json({
      status: 'success',
    });
  }
  else {
    return res.status(403).json({ error: "Unauthourized access" });
  }
  
  next();
});


const getEvents = async (req, res, next) => {
  try{
    const events = await User.find({_id: req.params.userId}).populate({path: 'registered'});
    console.log(events);
    return res.status(200).json({
      data: events[0].registered,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
}

const test = async(req, res) => {
    res.status(200).json({
        mess: "Samuel"
    })
}



// router.route('/events');
// router.get('/:userId', getEvents)


router.post('/create', createEvent);
router.post('/:eventId', registerEvent); 
router.delete('/:eventId', deregisterEvent);
router.get('/:userId', getEvents);

// router.use();

router.patch('/:eventId', modifyEvent);
router.delete('/delete/:eventId', deleteEvent);


module.exports = router;
