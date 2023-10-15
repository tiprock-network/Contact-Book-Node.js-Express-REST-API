const asyncHandler=require('express-async-handler')
//import contacts data model schema
const usercontacts=require('../models/userContacts')
//@desc Fetch all contacts
//@route GET /api/contacts
//@access Private
const getContacts= asyncHandler(async (req,res)=>{
    const contacts=await usercontacts.find()
    res.status(200).json(contacts)
 }
)

//@desc Fetch all contacts
//@route GET /api/contacts
//@access Public
const getEncyptedContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await usercontacts.find();

        // Helper function to encode a string with Base64
        const encodeString = str => Buffer.from(str+`${contacts.phone}:${contacts.country}`).toString('base64');

        // Function to recursively encode string values in an object
        const encodeObject = obj => {
            const encodedObj = {};
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') {
                    encodedObj[key] = encodeString(value);
                } else if (typeof value === 'object') {
                    encodedObj[key] = encodeObject(value);
                } else {
                    encodedObj[key] = value;
                }
            }
            return encodedObj;
        };

        // Map and encode each contact
        const encodedContacts = contacts.map(contact => encodeObject(contact._doc));

        res.status(200).json(encodedContacts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//@desc Fetch contact
//@route GET /api/contacts/:id
//@access Public
const getContact= asyncHandler(async (req,res)=>{
    
    try {
        const single_contact=await usercontacts.findById(req.params.id)
        //check for empty response
        if(!single_contact){
            res.status(404)
            throw new Error(`Contact with ID ${req.params.id} does not exist.`)
        }
        res.status(200).json(single_contact)
    } catch (error) {
         // Handle MongoDB Default CastError explicitly
         if (error.name === 'CastError') {
            res.status(404);
            throw new Error(`Contact with ID ${req.params.id} does not exist.`);
        }

        res.status(404).json({ error: `${error.message}` });
    }
    
 }
)

//@desc Add Contact
//@route POST /api/contacts/
//@access Private
const postContact=asyncHandler(
    async (req,res)=>{
        
        if(!req.body) {
            res.status(400)
            throw new Error('empty body is invalid')
    
        }
        try {
            const newContact = await usercontacts.create(req.body);
    
    
            res.status(201).json({Created_contact:newContact});
        } catch (error) {
            
            res.status(500).json({ error: `Internal Server Error: ${error.message}` });
            
        }
    }
)

//@desc Update Contact
//@route PUT /api/contacts/update/:id
//@access Private
const updateContact= asyncHandler(async (req,res)=>{
    const single_contact=await usercontacts.findById(req.params.id)
    if(!single_contact){
        res.status(404)
        throw new Error('contact does not exist')
    }

    const updated_contact=await usercontacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:`contact ${req.params.id} updated`,contact:updated_contact})
    }
)

//@desc Update Contact Part
//@route PATCH /api/contacts/update/part/:id
//@access Private
const updateContactPart=asyncHandler(async (req,res)=>{
    const single_contact=await usercontacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true,runValidators:true}
        )

    if(!single_contact){
        res.status(404);
        throw new Error(`${req.params.id} contact does not exist.`);
    }
    res.status(200).json({message:`contact ${req.params.id} updated`,single_contact})
    }
)

//@desc Delete
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact= asyncHandler(async (req,res)=>{
    await usercontacts.findByIdAndDelete(req.params.id)
    res.status(200).json({message:`contact ${req.params.id} deleted`})
})


module.exports={
    getContacts,getContact,postContact,updateContact,updateContactPart,deleteContact,getEncyptedContacts
}