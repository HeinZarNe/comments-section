import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply, FaPen, FaTrash } from "react-icons/fa";
import ReplyContainer from "../container/reply-container";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function Comment({
  comment,
  onUpvote,
  onDownvote,
  onReply,
  user,
  onDelete,
  onUpdate,
}) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isUpCLicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleUpdate = (id) => {
    onUpdate(id, editedText);
    setEdit(false);
    setEditedText("");
  };
  const commenter = comment.user;

  return (
    <div className="d-flex  flex-column align-items-end w-100">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="modal-title">Delete comment</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </Modal.Body>
        <Modal.Footer>
          <div className="row justify-content-around align-items-center w-100">
            <button onClick={handleClose} className="col-5 cancle-btn">
              <span>NO, CANCLE</span>
            </button>
            <button
              className="confirm-btn col-5"
              onClick={(_) => {
                onDelete(comment.id);
                handleClose();
              }}
            >
              <span>YES, DELETE</span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
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
            {!edit && user.username == commenter.username ? (
              <div className="option-btns d-flex justify-content-center align-items-center">
                <IconContext.Provider
                  value={{ size: 12, className: "delete-icon mb-1 " }}
                >
                  <div
                    className="delete-btn mx-2"
                    onClick={(_) => handleShow()}
                  >
                    <FaTrash /> Delete
                  </div>{" "}
                </IconContext.Provider>

                <IconContext.Provider
                  value={{ size: 12, className: "edit-icon mb-1 " }}
                >
                  <div className="edit-btn" onClick={(_) => handleEdit()}>
                    <FaPen /> Edit
                  </div>
                </IconContext.Provider>
              </div>
            ) : (
              !edit && (
                <div className="rp-btn" onClick={(_) => onReply(comment.id)}>
                  <IconContext.Provider
                    value={{ className: "rp-icon me-1", size: 13 }}
                  >
                    <FaReply /> Reply
                  </IconContext.Provider>
                </div>
              )
            )}
          </div>

          <div className="pt-2 comment-text ">
            {" "}
            {edit && user.username == comment.user.username ? (
              <textarea
                className="border border-1 border-secondary rounded-2 w-100"
                rows="4"
                value={editedText}
                onChange={(e) => setEditedText(e.currentTarget.value)}
              />
            ) : (
              comment.content
            )}
          </div>
          {edit && user.username == comment.user.username && (
            <div className="w-100 d-flex justify-content-end align-items-center">
              <button
                className=" py-2 update-btn mt-1 rounded-2 border-0"
                onClick={(_) => handleUpdate(comment.id)}
              >
                UPDATE
              </button>
            </div>
          )}
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
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
