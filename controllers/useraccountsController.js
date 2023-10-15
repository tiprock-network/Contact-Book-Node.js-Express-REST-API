const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler = require('express-async-handler')
const users=require('../models/user')

//@desc Register account
//@route POST /api/accounts
//@access Public
const registerUser = asyncHandler(
    async (req, res) => {
    try {
        const { name, email, password, phone, address, country, city } = req.body;

        // Check if required fields are missing
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        // Check if account exists before registration
        const userAccount = await users.findOne({ email });

        if (userAccount) {
            return res.status(400).json({ error: 'A user with this email exists.' });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const passHashed = await bcrypt.hash(password, salt);

        // Create user account
        const user = await users.create({
            name,
            email,
            password: passHashed,
            phone,
            address,
            country,
            city,
        });

        // Check if user was created
        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: gen_token(user._id),
                apiKey: user.apiKey?user.apiKey:null
            });
        } else {
            return res.status(400).json({ error: 'Bad request from client' });
        }
    } catch (error) {
        
        return res.status(500).json({ error: error.message });
    }
});




//@desc Authenticate 
//@route POST /api/accounts/login
//@access Public
const AuthUser= asyncHandler(
    async (req,res)=>{
        const {email,password}=req.body
        const user= await users.findOne({email})
        console.log(user)
        if(user && (await bcrypt.compare(password,user.password))){
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                apiKey: user.apiKey,
                token: gen_token(user._id),
                
            });
        }else {
            return res.status(400).json({ error: 'Bad request from client - invalid username and password' });
        }
    }
)

//@desc get account data
//@route GET /api/accounts/myaccount
//@access Private
const accUser= asyncHandler(
    async (req,res)=>{
        
        const {_id, name, email,address,country,city} = await users.findById(req.user.id)
        res.status(200).json({_id,name,email,address,country,city})
    }
)

const addApiKey = asyncHandler(
    async (req,res) =>{
        users.schema.add({ apiKey: { type: String } });
        const account=await users.findByIdAndUpdate(
            req.user.id,
            req.body,
            {new:true,runValidators:true}
            )
    
        if(!account){
            res.status(404);
            throw new Error(`${req.user.id} contact does not exist.`);
        }
        res.status(200).json({apiKey:`${req.body.apiKey}`})
        
    }
)

const delUser = asyncHandler(
    async (req,res) =>{
        const account = await users.findByIdAndDelete(req.user.id)
        if(!account){
            res.status(404)
            throw new Error('Account deleted or does not exist.')
        }
        res.status(200).json({message:`Account ${req.user.id} deleted`,Deleted_Account:req.user})
    }
)

//generate JWT Token - expires in 30 minutes
const gen_token = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:'30m'
    })
}

module.exports={registerUser,AuthUser,accUser,delUser,addApiKey}