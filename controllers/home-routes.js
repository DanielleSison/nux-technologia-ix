const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get("/", (req, res) => {
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// router.get('/', withAuth, async (req, res) => {
//     try { 
//         const postData = await Post.findAll({
//             include: [
//                 {
//                     model: User
//                 },
//             ]
//         });
//         const posts = postData.map((post) => post.get({ plain: true}));

//         res.render("all-posts", {
//             posts,
//             logged_in: req.session.logged_in 
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// get single post
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// router.get('/all-posts', (req, res) => {
//     if (!req.session.logged_in) {
//       res.redirect('/login');
//       return;
//     }
//     console.log(req.session);
//     res.render('all-posts');
    
//   });

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;