import Image from "next/image";
import { IconContext } from "react-icons";
import { FaPlus, FaMinus, FaReply } from "react-icons/fa";

export default function Reply() {
  return (
    <div className="d-flex mb-3 flex-column align-items-end">
      <div className="w-100 row m-0 comment p-3">
        <div className="d-flex justify-content-center align-items-start p-2 pt-0 col-1">
          <div className="d-flex flex-column justify-content-between vote-container">
            <IconContext.Provider value={{ size: 13, className: "vote-icon" }}>
              <FaPlus />

              <div className="my-2 vote-count">12</div>

              <FaMinus />
            </IconContext.Provider>
          </div>
        </div>
        <div className="col-11 ps-3 pe-0">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src="/src/images/avatars/image-amyrobson.png"
                width="30"
                height="30"
              />

              <div className="me-1 ms-3 user-name">Zar Ne</div>
              <div className="mx-2 posted-date">23 week ago</div>
            </div>
            <div className="rp-btn">
              <IconContext.Provider
                value={{ className: "rp-icon me-1", size: 13 }}
              >
                <FaReply /> Reply
              </IconContext.Provider>
            </div>
          </div>

          <div className="pt-2 comment-text ">
            Lorem ipsumsdafsdffdjjfiru juirhjguiiiiiiiiiiii iii
            iiiiiiiiiiiiiiiiii jhjjtr5hfu5 iiiiiiiiiiii iiiiis8rrrrrrrrrrrri
            opkggggggggggggggggggggggggggggggggggggdggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          </div>
        </div>
      </div>
    </div>
  );
}
