const express = require("express");
const app=express();
const PORT =5000;
const mongoose=require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
const mongoURL = "mongodb://localhost:27017/customer";



app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true,
}))

mongoose.connect(mongoURL, { useNewUrlParser: true })

.then(()=>{
    console.log("connected to mongoose db");
})
.catch((error)=>
console.log("failed to connect"));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    mobile: String

});

const User = mongoose.model('User',userSchema);

app.post('/employee',async (req,res) => {
    const {username,email,password,mobile} = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        
        const newUser = new User ({username,email,password,mobile});

        await newUser.save();
        
        console.log("Registration Succesful:", newUser);
    } catch(error){
       // res.json("fail");
        console.error('Failed to register:', error);
       // res.status(500).json({message:'Failed to register'});

    }
});
app.post('/userLogin',async (req,res) => {
    const {email,password} = req.body;
    try{
       const user=await User.findOne({email,password});
        
       if(!user){
        return res.status(404).json({message:'User not found'});

       }
       const allUsers=await User.find({});
       res.json(allUsers);
       res.status(200).json({message:'Login Succesful',user});
    } catch(error){
       
        console.error('Failed to Login:');
        res.status(500).json({message:'Failed to Login'});

    }
});




app.listen(PORT,() =>console.log(`server running on port ${PORT}`));