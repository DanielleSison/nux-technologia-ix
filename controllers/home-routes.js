const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require('../utils/auth');

// Gets all Post with the '/' route and when 'TECH BLOG' is clicked by the User
router.get("/", async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true}));

        res.render("all-posts", {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Gets a single post by the ID for commenting
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
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});


router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;