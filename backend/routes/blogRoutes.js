import express from 'express';
import blogModel from '../models/blogModel.js';
import mongoose from 'mongoose';
import userModel from '../models/userModel.js';


const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    let blogs;
    try {
       blogs = await blogModel.find().populate('user'); 
    } catch (error) {
      return console.log(error);  
    }
    if (!blogs) {
        return res.status(404).send({ message: "No blogs Found" });
    }
    return res.status(200).send({ blogs });
});


// Creating a blog
router.post('/add', async (req, res) => {
    const { title, describtion, image, user } = req.body;

    let existingUser;
    try {
     existingUser = await userModel.findById(user);
    } catch (error) {
     return console.log(error);
    }
    if (!existingUser) {
        return res.status(400).send({ message: " Unable to find user with Id"});
    }

    const blog = new blogModel({
        title,
        describtion,
        image,
        user,
    });
    try {
        // This is declaring for a session to save the blog;
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (error) {
        console.log(error);
       return res.status(500).send({ message: error });
        
    }
    return res.status(200).send({ blog });
});

// Updating blog the PUT is used for updating purpose;
router.put('/update/:id', async (req, res) => {
    // We can only update title and describtion
    const { title, describtion } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await blogModel.findByIdAndUpdate(blogId, {
            title,
            describtion,
        });
    } catch (error) {
        console.log(error);
    }
    
    if (!blog) {
        return res.status(500).send({ message: "unable to Update the blog" });
    }
    return res.status(200).send({ blog });
});

// Getting one blog
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await blogModel.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).send({ message: "No blog found" });
    }
        return res.status(200).send({ blog });
});

// Delete blog;
router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await blogModel.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).send({ message: "unable to Delete the blog" });
}
    return res.status(200).send({ message: "Deleted Successfully" });
});

// Getting the blocks of users
router.get('/user/:id', async (req, res) => {
const userId = req.params.id;
let userBlogs;
try {
    userBlogs = await userModel.findById(userId).populate("blogs");
} catch (error) {
    return console.log(error)
}
if (!userBlogs) {
    return res.status(404).send({ message: "No Blog found"});
}
return res.status(200).send({ user: userBlogs });
})



export default router;