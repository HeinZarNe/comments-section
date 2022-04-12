import Image from "next/image";
import { useState, useEffect } from "react";
import { FaTruckMonster } from "react-icons/fa";

export default function Input({ onPostMain, onPostReply, user, reply }) {
  const [text, setText] = useState("");
  const [warn, setWarn] = useState(false);

  useEffect(
    (_) => {
      reply && setText(`@${reply.user.username} `);
    },
    [reply]
  );

  return (
    user && (
      <div className="mt-3 input row p-3 w-100 align-items-start position-sticky ">
        <div className="col-1 p-1">
          <Image src={user.image.png} width="40" height="40" />
        </div>
        <div className="col-9 p-1">
          <textarea
            className="w-100 p-2 ps-3"
            rows="3"
            value={text}
            placeholder="Add a comment..."
            onChange={(e) => setText(e.currentTarget.value)}
          />
          {warn && (
            <span className="text-danger">Text must exceed 5 letters!!</span>
          )}
        </div>
        <div className="col-2 p-1">
          <button
            className="w-100"
            onClick={(_) => {
              if (text.length >= 5 && reply) {
                onPostReply(text);
                setWarn(false);
              } else if (text.length >= 5) {
                onPostMain(text);
                setWarn(false);
              } else {
                setWarn(true);
              }

              setText("");
            }}
          >
            SEND
          </button>
        </div>
      </div>
    )
  );
}
