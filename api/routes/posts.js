const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const createdPost = await newPost.save();
        return res.status(200).json(createdPost);
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true }) // { new: true } => to see updated version on postman response

                return res.status(200).json(updatedPost)
            } catch (err) {
                return res.status(500).json(err.message)
            }
        } else {
            return res.status(401).json("You can only update your post!")
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                return res.status(200).json("Post has been deleted...");
            } catch (err) {
                return res.status(500).json(err.message);
            }
        } else {
            return res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// GET ALL POSTS OF SINGLE USER
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts
        if (username) {
            posts = await Post.find({
                username: username
            })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName] // $in = inside,includes
                }
            })
        } else {
            posts = await Post.find() // getting all posts ,/without condition
        }
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})


module.exports = router;