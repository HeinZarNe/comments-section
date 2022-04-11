import Comment from "../util/comment";
import Input from "../util/Input";
import { useState, useEffect } from "react";

export default function Container() {
  const [reply, setReply] = useState(null);
  const [replyId, setReplyId] = useState(null);
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

  const handlePostMain = async (comment) => {
    let response = await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post: "post", to: "main" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  };
  const handlePostReply = async (comment) => {
    let id = replyId;
    let response = await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ id, comment, post: "post", to: "replies" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setReply(null);
    fetchComments();
  };

  const fetchUserData = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data);
  };
  const handleReply = (replyCommentId) => {
    setReplyId(replyCommentId);
    let mainComment = comments.find((c) => c.id == replyCommentId);

    if (mainComment == undefined) {
      mainComment = comments.find((c) =>
        c.replies.find((c) => c.id == replyCommentId)
      );
      mainComment = mainComment.replies.find((c) => c.id == replyCommentId);
    }
    setReply(mainComment);
  };
  const handleDelete = async (id) => {
    const response = await fetch("/api/comments", {
      method: "DELETE",
      body: id,
    });
    fetchComments();
  };
  const handleUpdate = async (id, text) => {
    const response = await fetch("/api/comments", {
      method: "PUT",
      body: JSON.stringify({ id, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  };
  return (
    <div className="comments-container d-flex  justify-content-center align-items-center py-3 flex-column">
      {comments.map((comment) => (
        <Comment
          user={user}
          key={comment.id}
          comment={comment}
          onDownvote={handleDownvote}
          onUpvote={handleUpvote}
          onReply={handleReply}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      <Input
        onPostMain={handlePostMain}
        onPostReply={handlePostReply}
        user={user}
        reply={reply}
      />
    </div>
  );
}
