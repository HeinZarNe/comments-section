import Image from "next/image";
export default function Input() {
  return (
    <div className="mt-3 input row p-3 w-100 align-items-start">
      <div className="col-1 p-1">
        {" "}
        <Image
          src="/src/images/avatars/image-amyrobson.png"
          width="40"
          height="40"
        />
      </div>
      <div className="col-9 p-1">
        <textarea
          className="w-100 p-2 ps-3"
          rows="3"
          placeholder="Add a comment..."
        />
      </div>
      <div className="col-2 p-1">
        <button className="w-100">REPLY</button>
      </div>
    </div>
  );
}
