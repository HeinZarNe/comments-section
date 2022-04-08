import Reply from "../util/reply";

export default function ReplyContainer({
  replyComments,
  onUpvote,
  onDownvote,
}) {
  return (
    <div className="d-flex reply-comment-container justify-content-end  flex-column ">
      {replyComments.map((rp) => (
        <Reply
          key={rp.id}
          comment={rp}
          handleUpvote={onUpvote}
          handleDownvote={onDownvote}
        />
      ))}
    </div>
  );
}
