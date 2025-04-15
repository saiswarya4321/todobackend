const express=require("express");

const app=express();
app.use(express.json());
const cors = require("cors");
// app.use(cors({
//     origin: "http://localhost:5173",  // Allow frontend origin
//     credentials: true                 // Allow cookies/auth headers
// }));

const allowedOrigins = [
    "http://localhost:5173",
    "https://todofrontend-sooty.vercel.app"
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));

const dotenv=require("dotenv");
const mongoose=require("mongoose")
dotenv.config();
app.get("/",(req,res)=>{
    res.send("hello world");
})
const authRoutes=require("./routes/auth")
const todos=require("./routes/todos");


const PORT=process.env.PORT||5006;

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("mongodb connected ")
})
.catch(error =>console.log("mongodb error",error))


app.use("/api/auth",authRoutes);
app.use("/api/todos",todos)


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})