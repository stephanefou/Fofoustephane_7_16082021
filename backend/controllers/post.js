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
            "Posts".publication_date AS date
        FROM "Users" INNER JOIN "Posts" ON "Users".id = "Posts".User_id
        ORDER BY date DESC`,
        (error, result, rows) => {
            rows = result.rows;
            console.log(result);
            console.log(result.rows);
            console.log(rows.length);
          //console.log(result.length);
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json({rows});
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
    db.query(`SELECT * FROM "Posts" WHERE id = ${req.params.id}`,
    (error, result, rows) => {
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
// Delete OnePost
exports.deleteOnePost = (req, res, next) => {
    db.query(`DELETE FROM "Posts" WHERE id = '${req.params.id}'`, (error, result, field) => {
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
    db.query(`
        UPDATE "Posts" SET "title" = '${req.body.title}',
        "content" = '${req.body.content}' WHERE id = '${req.body.postId}'
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
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM "Posts" WHERE user_id = ${req.params.id}`, 
    (error, result, rows) => {
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
    db.query(
        `INSERT INTO "Comments" VALUES (
            nextval('users_id_seq'::regclass), --increment commentaire
            ${req.body.userId},
            ${req.body.postId},
            NOW(),
            '${req.body.content}'
        )`,
        (error, result, rows) => {
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
// Get all comments
exports.getAllComments = (req, res, next) => {
    db.query(
        `SELECT
            "Users".id,
            "Users".lastname,
            "Users".firstname,
            "Comments".id,
            "Comments".content,
            "Comments".user_id,
            "Comments".publication_date AS date
            FROM "Users" INNER JOIN "Comments" ON "user_id" WHERE "Comments".post_id = '${req.body.postId}'
        `,
        (error, result, rows) => {
        rows = result.rows;
        console.log(result);
        console.log(result.rows);
        console.log(rows.length);
        //console.log(result.length);
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json({rows});
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