const express=require('express')
const router=express.Router()
const {getContacts,getContact,postContact,updateContact,updateContactPart,getEncyptedContacts,deleteContact} =require('../controllers/contactBookController')
//import route protection middleware
const protect = require('../middleware/authMiddleware')
const passport = require('passport')
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy
const User = require('../models/user')

passport.use(new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Api-Key ' },
    false,
    async (apikey, done) => {
        try {
            const user = await User.findOne({ apiKey: apikey }).exec();

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));


router.route('/').get(passport.authenticate('headerapikey',{ session: false}) ,getContacts).post(protect, postContact)
router.route('/public').get(getEncyptedContacts)

router.route('/:id').get(passport.authenticate('headerapikey',{ session: false}), getContact).delete(protect, deleteContact)

router.put('/update/:id', protect, updateContact)
router.patch('/update/part/:id', protect, updateContactPart)



module.exports=router