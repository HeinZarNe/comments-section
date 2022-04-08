// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../data/data";
let comment = data.comments;
export default function handler(req, res) {
  if (req.method == "POST") {
    if (req.body.vote) {
      let id = req.body.id;

      console.log("yes");
      comment.map((c) => {
        if (c["replies"].length > 0) {
          const currentComment = c["replies"].find((c) => c.id == id);
          if (req.body.vote == "up") {
            ++currentComment.score;
          } else if (req.body.vote == "down" && currentComment.score > 0) {
            --currentComment.score;
          }
        }
      });
      return res.status(200).json(comment);
    } else if (req.body.post) {
      let id = Date.now();
      const newPost = {
        id,
        content: String(req.body.comment),
        createdAt: "1 month ago",
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
    }
  }
  return res.status(200).json(comment);
}
