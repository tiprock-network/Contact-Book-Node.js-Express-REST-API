const mongoose=require('mongoose')

const connect= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to cluster DB successfully: ${conn.connection.host}`.bgGreen.underline)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports =connect