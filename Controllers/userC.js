const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../modules/userSchema")
require("dotenv").config()

const signin = async (req, res) => {
    const { email, password } = req.body;
 
    try {
      const existingUser = await user.findOne({ email });
  
      if (!existingUser)
        return res.status(404).send({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).send({ message: "Invalid credentials" });
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET,
        { expiresIn: "3650d" }
      );

      if(email === "gaurvpatil17@gmail.com"){
        res.status(200).json({ result: existingUser, token , message:"admin" });
      }else{
        res.status(200).json({ result: existingUser, token });
      }
     
    } catch (err) {
      res.status(500).send({ message: "Server error" });
    }
  };
  
  const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
  
    try {
      const existingUser = await user.findOne({ email });
  
      if (existingUser)
        return res.status(404).send({ message: "User already exists" });
  
      if (password !== confirmPassword)
        return res.status(400).send({ message: "Passwords don't match" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await user.create({
        email,
        password: hashedPassword,
        name: `${firstName.trim()} ${lastName.trim()}`,
      });
  
      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET,
        {  expiresIn: "3650d" }
      );

      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
  
  
    }
  };

  module.exports = {
      signin,
      signup
  }