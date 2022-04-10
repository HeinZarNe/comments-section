import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import { useState } from "react";

export default function Reply({ comment, handleUpvote, handleDownvote }) {
  const [isUpCLicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);

  return (
    <>
      <div className="d-flex mb-3 flex-column align-items-end">
        <div className="w-100 row m-0 comment p-3">
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
      </div>
    </>
  );
}
