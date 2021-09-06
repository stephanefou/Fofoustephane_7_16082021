const db = require("../utils/database.js");

// All post
exports.getAllPost = (req, res, next) => {
    db.query(
        `SELECT
            "Users".lastname,
            "Users".firstname,
            "Posts".id,
            "Posts".user_id,
            "Posts".title,
            "Posts".content,
            "Posts".publication_date AS date FROM "Users" INNER JOIN "Posts" ON "Users".id = "Posts".User_id ORDER BY date DESC
            `,
        (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// NewPost
exports.newPost = (req, res, next) => {
    db.query(
        `INSERT INTO "Posts" VALUES (
            nextval('users_id_seq'::regclass), --increment commentaire
            NOW(),
            '${req.body.userId}',
            '${req.body.title}',
            '${req.body.content}'
        )`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({error});
            }
        return res.status(201).json({
            message: 'Votre post à été publié !'
        })
    });
};
// OnePost
exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.body.postId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Delete OnePost
exports.deleteOnePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.body.postId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
    db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.body.postId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM "Posts" WHERE user_id = ${req.body.userId}`, (error, result, rows) => {
        rows = result.rows;
        console.log(result);
        console.log(result.rows);
        console.log(rows.length);
        console.log(result.length);
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json({rows});
    });
};
// New comment
exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.body.postId}, NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Get all comments
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.nom, users.prenom, comments.id,comments.content, comments.userId, DATE_FORMAT(comments.date, "le %e %M %Y à %kh%i") AS date
    FROM users INNER JOIN comments ON users.id = comments.userId 
     WHERE comments.postId = ${req.body.postId} 
     ORDER BY comments.date DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
};
//Delete comment
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.body.commentId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};