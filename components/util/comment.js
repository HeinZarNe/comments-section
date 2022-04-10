import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import ReplyContainer from "../container/reply-container";
import { useState } from "react";

export default function Comment({ comment, onUpvote, onDownvote }) {
  const [isUpCLicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);

  const user = comment.user;
  return (
    <div className="d-flex  flex-column align-items-end w-100">
      <div className="w-100 mb-3 row m-0 comment p-3">
        <div className="d-flex justify-content-center align-items-start p-2 pt-0 col-1">
          <div className="d-flex flex-column justify-content-between vote-container">
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
              <Image src={user.image.png} width="30" height="30" />

              <div className="me-1 ms-3 user-name">{user.username}</div>
              <div className="mx-2 posted-date">{comment.createdAt}</div>
            </div>
            <div className="rp-btn">
              <IconContext.Provider
                value={{ className: "rp-icon me-1", size: 13 }}
              >
                <FaReply /> Reply
              </IconContext.Provider>
            </div>
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
        />
      )}
    </div>
  );
}
