const express=require("express");
const app=express();
const authenticatedToken=require("../routes/middleware")
const router=express.Router();
const Todos=require("../models/Todos")

router.post("/",authenticatedToken, async (req,res)=>{

    const {title}=req.body;
    const newToDo=new Todos({
        title,
        user: req.user.id
    });
    try{
        const savedTodo= await newToDo.save();
        res.status(201).json({savedTodo});
    }
    catch(error){
        res.status(500).json({error: "Error creating todo"})
    }
})

router.get("/",authenticatedToken, async (req,res)=>{
    try {
        const todos=await Todos.find({user:req.user.id});
        res.json(todos);
        
    } catch (error) {
        res.status(500).json({error:"Error fetching todos"})
    }
})




module.exports=router;
