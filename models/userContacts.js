const mongoose=require('mongoose')
const usercontactsSchema= mongoose.Schema(
    {
        
            user:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'user'
            },
            name:{
                type:String,
                required:[true, 'name missing']
            },
            phone:{
                type:String,
                required:[true,'phone number missing']
            },
            address:{
                type:String,
                required:[true,'address missing']
            },
            email:{
                type:String,
                required:[true,'email missing']
            },
            country:{
                type:String,
                required:[true,'country missing']
            },
            city:{
                type:String,
                required:false
            }
        
        
    }
)

module.exports= mongoose.model('usercontacts',usercontactsSchema)