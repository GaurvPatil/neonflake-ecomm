const express = require("express")
const app = express()
require("dotenv").config();
const connectDB = require("./Db/Connect")
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const path = require("path");

let cors = require("cors");

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());






// routes 
app.use(
  "/user",
  userRoutes
)
// static image folder 
app.use("./imageUpload" , express.static("./imageUpload"))

app.use(
  "/neonflake",
  productRoutes
)


// ....................deployment ....................//

const __dirname1 = path.resolve()
 

if(process.env.NODE_ENV === "production"){
app.use( express.static(path.join(__dirname1 , "./frontend/build")) )
app.get("*" , (req,res)=>{
 res.sendFile(path.resolve(__dirname1 , "frontend","build", "index.html"))
})
}else{
  app.get("/" , (req,res)=>{
    res.send("API is runing")
  })
}



// ....................deployment ....................//



const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}... `));
  } catch (error) {
    console.log(error);
  }
};

start();