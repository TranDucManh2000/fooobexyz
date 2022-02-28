import React from "react";
import Navmenu from "./Navmenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import "./../youcss/cmt.css";

function Comment() {
  const [cookies, setCookies, removeCookie] = useCookies([
    "name",
    "pass",
    "loai",
    "id",
    "ulmes",
  ]);
  const sp = {
    name: "",
    price: "",
    url: "",
  };
  const bll = [];
  const [resf, setresf] = useState("");
  const [inp, setinp] = useState("");
  const [bls, setbls] = useState(bll);
  const [sps, setsps] = useState(sp);
  useEffect(() => {
    axios.get(cookies.ulmes).then((e) => {
      const { data } = e;
      setsps(data);
    });
  }, []);
  useEffect(() => {
    axios.get(cookies.ulmes + "/comment").then((e) => {
      const { data } = e;
      setbls(data);
    });
  }, [resf]);
  const inputOnchang = function (e) {
    //  console.log(e.target.value)
    setinp(e.target.value);
  };
  const blOnclick = function (e, name, userid) {
    //  console.log(inp);
    //  console.log(name);
    //  console.log(userid);
    axios
      .post(cookies.ulmes + "/comment", {
        name: name,
        userid: userid,
        bluan: inp,
      })
      .then((e) => {
        const { data } = e;
        console.log(data);
        setresf(data);
      });
  };
  // var d = new Date();
  // var a = d.getDate();
  // var b = d.getMonth()+1;
  // var c = d.getFullYear();
  return (
    <div>
      <Navmenu />
      <div className="divnen2">
        <div className="ttsp">
          <img src={sps.url} className="anhcm"></img>
          <h2 className="ctt">Tên :{sps.name}</h2>
          <h2 className="ctt">Cỡ : L</h2>
          <h2 className="ctt">Giá : {sps.price}</h2>
        </div>

        <div className="khungcmt">
          <div className="kcmt">
            <div className="comment-widgets m-b-20">
              {bls.map((bl) => (
                <div className="d-flex flex-row comment-row">
                  <div className="p-2">
                    <span className="round">
                      <img
                        src="https://3.bp.blogspot.com/-Ceze_9O3UHQ/XCmxyIL17RI/AAAAAAAAAYg/-d4TLDZcc58lcflI32UuliOzXVq7N7HhACLcBGAs/s1600/EmXinh2k__anh-gai-xinh-2000-girl-xinh-10x%2B%25288%2529.jpg"
                        alt="user"
                        width="50"
                      />
                    </span>
                  </div>
                  <div className="comment-text">
                    <h5 className="cname">{bl.name}</h5>
                    <div className="comment-footer">
                      {/* <span className="date"> . Time : {bl.time}</span> */}
                    </div>
                    <br />
                    <p>{bl.bluan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="khungcmt">
          <div className="kcmt">
            <div className="comment-widgets m-b-20">
              <div className="d-flex flex-row comment-row">
                <div className="p-2">
                  <span className="round">
                    <img
                      src="https://3.bp.blogspot.com/-Ceze_9O3UHQ/XCmxyIL17RI/AAAAAAAAAYg/-d4TLDZcc58lcflI32UuliOzXVq7N7HhACLcBGAs/s1600/EmXinh2k__anh-gai-xinh-2000-girl-xinh-10x%2B%25288%2529.jpg"
                      alt="user"
                      width="50"
                    />
                  </span>
                </div>
                <div className="comment-text">
                  <h5 className="cname">{cookies.name}</h5>
                  {/* <div className="comment-footer">
                <span className="date"> . Time : 14, 2019</span>
              </div> */}
                  <br />
                  <input
                    onChange={inputOnchang}
                    name="blvalue"
                    className="inpbl"
                  ></input>
                  <button
                    className="btn"
                    onClick={function (e, name, userid) {
                      name = cookies.name;
                      userid = cookies.id;
                      blOnclick(e, name, userid);
                    }}
                  >
                    Bình luận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
