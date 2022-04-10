import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply, FaTrash, FaPen } from "react-icons/fa";
import { useState } from "react";

export default function Reply({
  comment,
  handleUpvote,
  handleDownvote,
  handleReply,
  user,
}) {
  const [isUpCLicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);

  return (
    <>
      <div className="d-flex mb-3 flex-column align-items-end">
        <div className="w-100 row m-0 comment p-3">
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
                        handleUpvote(comment.id);
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
                        handleUpvote(comment.id);
                        setIsDownClicked(true);
                        setIsUpClicked(true);
                      }
                    }}
                  />
                </IconContext.Provider>
              )}
              <IconContext.Provider
                value={{ size: 13, className: "vote-icon" }}
              >
                <div className="my-2 vote-count">{comment.score}</div>

                <FaMinus
                  onClick={(_) => {
                    if (isUpCLicked) {
                      comment.score > 0 && handleDownvote(comment.id);

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
                <Image src={comment.user.image.png} width="30" height="30" />

                <div className="me-1 ms-3 user-name">
                  {comment.user.username}
                </div>
                {user.username == comment.user.username && (
                  <div className="you-tag px-1 rounded-2  ">you</div>
                )}
                <div className="mx-2 posted-date">{comment.createdAt}</div>
              </div>
              {user.username == comment.user.username ? (
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
                <div
                  className="rp-btn"
                  onClick={(_) => handleReply(comment.id)}
                >
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
      </div>
    </>
  );
}
