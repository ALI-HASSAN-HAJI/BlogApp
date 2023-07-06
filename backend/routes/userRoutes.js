import express from 'express';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';


const router = express.Router();


// Getting all users;
router.get('/', async (req, res) => {
    let users;
 try {
   users = await userModel.find();
 } catch (error) {
   return console.log(error)
 }
 if (!users) {
    return res.status(404).send({ message: "No Users Found" })
 }
 return res.status(200).send({ users });
});


// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({ email });
    } catch (error) {
      return console.log(error);
    }
    if (existingUser) {
        return res.status(400).send({ message: "User Already Exists! Login instead" });
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new userModel({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
      await user.save();
    } catch (error) {
      return console.log(error);
    }

    return res.status(201).send({ user })
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await userModel.findOne({ email });
    } catch (error) {
      return console.log(error);
    }
    if (!existingUser) {
        return res.status(404).send({ message: "Can't find a user with this email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).send({ message: "Incorrect Password" });
    }
    return res.status(200).send({ message: "Logged in Successfully", user: existingUser });

});

export default router;