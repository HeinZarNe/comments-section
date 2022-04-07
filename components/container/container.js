import Comment from "../util/comment";
import Input from "../util/Input";
import { useState, useEffect } from "react";

export default function Container() {
  useEffect((_) => {
    fetchComments();
  }, []);
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    let response = await fetch("api/comments");
    let data = await response.json();
    setComments(data);
  };
  return (
    <div className="comments-container d-flex  justify-content-center align-items-center py-3 flex-column">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <Input />
    </div>
  );
}
