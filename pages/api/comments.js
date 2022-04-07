// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../data/data";
let comment = data.comments;
export default function handler(req, res) {
  return res.status(200).json(comment);
}
