import { data } from "../../data/data";
let user = data.currentUser;
export default function handler(req, res) {
  res.status(200).json(user);
}
