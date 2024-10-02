const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// In-memory storage for posts
let posts = [];

// Route: Home (View All Posts)
app.get('/', (req, res) => {
    res.render('home', { posts });
});

// Route: View a Single Post
app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Route: Create New Post Page
app.get('/create', (req, res) => {
    res.render('create');
});

// Route: Handle New Post Submission
app.post('/create', (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

// Route: Edit Post Page
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.render('edit', { post });
    } else {
        res.redirect('/');
    }
});

// Route: Handle Post Update
app.post('/edit/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
    }
    res.redirect('/');
});

// Route: Handle Post Deletion
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
