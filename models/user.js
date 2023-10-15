const mongoose=require('mongoose')
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'name\'s missing']
    },
    email:{
        type:String,
        require:[true,'email missing'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password missing']
    },
    phone:{
        type:String,
        required:[true,'phone number\'s missing']
    },
    address:{
        type:String,
        required:[true,'address missing']
    },
    country:{
        type:String,
        required:[true,'country missing']
    },
    city:{
        type:String,
        required:false
    },
    apiKey:{
        type:String,
        required:false
    }
},
{
    timestamps:true
})

module.exports= mongoose.model('user',userSchema)