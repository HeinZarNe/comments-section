import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply, FaPen, FaTrash } from "react-icons/fa";
import ReplyContainer from "../container/reply-container";
import { useState } from "react";

export default function Comment({
  comment,
  onUpvote,
  onDownvote,
  onReply,
  user,
}) {
  const [isUpCLicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);

  const commenter = comment.user;
  console.log("user", user.username);
  console.log("commenter", commenter.username);
  return (
    <div className="d-flex  flex-column align-items-end w-100">
      <div className="w-100 mb-3 row m-0 comment p-3">
        <div className="d-flex justify-content-center align-items-start p-2 pt-0 col-1">
          <div className="d-flex flex-column justify-content-between vote-container align-items-center">
            {isUpCLicked ? (
              <IconContext.Provider
                value={{
                  size: 13,
                  className: "vote-icon clicked-icon",
                }}
              >
                <FaPlus
                  onClick={(_) => {
                    if (!isDownClicked) {
                      onUpvote(comment.id);
                      setIsDownClicked(true);
                      setIsUpClicked(true);
                    }
                  }}
                />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider
                value={{ size: 13, className: "vote-icon" }}
              >
                <FaPlus
                  onClick={(_) => {
                    if (!isDownClicked) {
                      onUpvote(comment.id);
                      setIsDownClicked(true);
                      setIsUpClicked(true);
                    }
                  }}
                />
              </IconContext.Provider>
            )}

            <div className="my-2 vote-count">{comment.score}</div>
            <IconContext.Provider value={{ size: 13, className: "vote-icon" }}>
              <FaMinus
                onClick={(_) => {
                  if (isUpCLicked) {
                    comment.score > 0 && onDownvote(comment.id);

                    setIsDownClicked(false);
                    setIsUpClicked(false);
                  }
                }}
              />
            </IconContext.Provider>
          </div>
        </div>
        <div className="col-11 ps-3 pe-0">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-center align-items-center">
              <Image src={commenter.image.png} width="30" height="30" />
              <div className="me-1 ms-3 user-name">{commenter.username}</div>
              {user.username == commenter.username && (
                <div className="you-tag px-1 rounded-2  ">you</div>
              )}
              <div className="mx-2 posted-date">{comment.createdAt}</div>
            </div>
            {user.username == commenter.username ? (
              <div className="option-btns d-flex justify-content-center align-items-center">
                <IconContext.Provider
                  value={{ size: 12, className: "delete-icon mb-1 " }}
                >
                  <div className="delete-btn mx-2">
                    <FaTrash /> Delete
                  </div>{" "}
                </IconContext.Provider>

                <IconContext.Provider
                  value={{ size: 12, className: "edit-icon mb-1 " }}
                >
                  <div className="edit-btn">
                    <FaPen /> Edit
                  </div>
                </IconContext.Provider>
              </div>
            ) : (
              <div className="rp-btn" onClick={(_) => onReply(comment.id)}>
                <IconContext.Provider
                  value={{ className: "rp-icon me-1", size: 13 }}
                >
                  <FaReply /> Reply
                </IconContext.Provider>
              </div>
            )}
          </div>

          <div className="pt-2 comment-text ">{comment.content}</div>
        </div>
      </div>
      {comment.replies.length !== 0 && (
        <ReplyContainer
          key={comment.id}
          replyComments={comment.replies}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          onReply={onReply}
          user={user}
        />
      )}
    </div>
  );
}
