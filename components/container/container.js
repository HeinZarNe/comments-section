import Comment from "../util/comment";
import Input from "../util/Input";
import { useState, useEffect } from "react";

export default function Container() {
  useEffect((_) => {
    fetchUserData();

    fetchComments();
  }, []);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(undefined);
  const fetchComments = async () => {
    let response = await fetch("api/comments");
    let data = await response.json();
    setComments(data);
  };
  const handleUpvote = async (id) => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ id, vote: "up" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  };
  const handleDownvote = async (id) => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ id, vote: "down" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  };

  const handlePost = async (comment) => {
    let response = await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post: "post" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  };

  const fetchUserData = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="comments-container d-flex  justify-content-center align-items-center py-3 flex-column">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDownvote={handleDownvote}
          onUpvote={handleUpvote}
        />
      ))}
      <Input onPost={handlePost} user={user} />
    </div>
  );
}
