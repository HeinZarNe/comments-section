import Image from "next/image";
import { useState } from "react";
export default function Input({ onPost, user }) {
  const [text, setText] = useState("");

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
        </div>
        <div className="col-2 p-1">
          <button
            className="w-100"
            onClick={(_) => {
              onPost(text);
              setText("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    )
  );
}