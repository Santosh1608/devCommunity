const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      let newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//@route  GET api/posts
//@desc   GET all posts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route  GET api/posts/:id
//@desc   GET post by ID
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.send(post);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route  DELETE api/posts/:id
//@desc   Delete a post
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    //Check on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: 'User not authorized' });
    }
    await post.remove();
    res.send('Post removed');
    res.send(post);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route  PUT api/posts/like/:id
//@desc   Like a Post
//@access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send({ msg: 'Pos already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send(post.likes);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  PUT api/posts/unlike/:id
//@desc   Unlike a Post
//@access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send({ msg: 'Post has not been liked yet' });
    }
    //GET remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.send(post.likes);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  POST api/posts/comments/:id
//@desc   Comment on a post
//@access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      let newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.send(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   Delete comment
//@access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //PULL OUT COMMENT
    const comment = post.comments.find((comment) => {
      return comment.id === req.params.comment_id;
    });
    //Make sure comment exist
    if (!comment) {
      return res.status(404).send({ msg: 'Comment does not exist' });
    }
    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: 'user not authorized' });
    }
    //GET remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.send(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
