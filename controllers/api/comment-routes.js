const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils");

router.post("/", (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
