const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }, {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({
            plain: true
        }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    router.get('/new', (req, res) => {
        res.render('add-post', {
            loggedIn: true
        })
    })

    module.exports = router;
