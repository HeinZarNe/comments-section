// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../data/data";
import moment from "moment";
import { FaRegWindowClose } from "react-icons/fa";
moment().format();
let comment = data.comments;
export default function handler(req, res) {
  const vote = (thisComment) => {
    if (req.body.vote == "up") {
      ++thisComment.score;
    } else if (req.body.vote == "down" && thisComment.score > 0) {
      --thisComment.score;
    }
  };

  if (req.method == "POST") {
    comment.sort((a, b) => b.score - a.score);

    if (req.body.vote) {
      let id = req.body.id;

      let mainComment = comment.find((c) => c.id == id);

      if (mainComment == undefined) {
        comment.map((c) => {
          if (c["replies"].length > 0) {
            const currentComment = c["replies"].find((c) => c.id == id);
            vote(currentComment);
          }
        });
      } else {
        vote(mainComment);
      }

      return res.status(200).json(comment);
    } else if (req.body.post) {
      let id = Date.now();

      if (req.body.to == "main") {
        const newPost = {
          id,
          content: String(req.body.comment),
          createdAt: "just now",
          score: 0,
          user: {
            image: {
              png: data.currentUser.image.png,
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
          replies: [],
        };
        comment.push(newPost);
      } else if (req.body.to == "replies") {
        let currentComment = comment.find((c) =>
          c.replies.find((c) => c.id == req.body.id)
        );
        if (!currentComment) {
          currentComment = comment.find((c) => c.id == req.body.id);
        }
        const newPost = {
          id,
          content: String(req.body.comment),
          createdAt: "just now",
          score: 0,
          user: {
            image: {
              png: data.currentUser.image.png,
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
        };
        currentComment.replies.push(newPost);
      }
    }
  }
  return res.status(200).json(comment.sort((a, b) => b.score - a.score));
}
