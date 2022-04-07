import Comment from "../util/comment";
import Input from "../util/Input";
export default function Container() {
  return (
    <div className="comments-container d-flex  justify-content-center align-items-center py-3 flex-column">
      <Comment />
      <Input />
    </div>
  );
}
