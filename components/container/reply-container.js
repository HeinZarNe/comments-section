import Reply from "../util/reply";

export default function ReplyContainer({ replyComments }) {
  return (
    <div className="d-flex reply-comment-container justify-content-end  flex-column ">
      {replyComments.map((replyComment) => (
        <Reply key={replyComment.id} comment={replyComment} />
      ))}
    </div>
  );
}
