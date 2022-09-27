import "./new.scss";
import { useNavigate } from "react-router-dom";

import { useLocation /* other hooks */ } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";

import { addMCQApi, addQasetApi, updateMcqApi } from "../../ApiService";
import "katex/dist/katex.min.css";
import {Mathmark} from '../MathMarkdown/MarkDown';

import { InlineMath, BlockMath } from "react-katex";
import { Button } from "@mui/material";

const QAadd = () => {
  let history = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState("");
  const [subject, setSubject] = useState("");
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [ans, setAns] = useState(-1);
  const [uans, setUans] = useState("");

  useEffect(() => {
    console.log("the state---", location.state);

    if (localStorage.getItem("Token")) {
      if (location.state.item) {
        setQues(location.state.data.ques);
        setUans(location.state.data.ans);
        setOptions(location.state.data.options);
      }
    } else {
      history("/");
    }
  }, []);

  const fun = () => {
    console.log("the subject is ", subject);
  };

  const onSave = () => {
  //  if(ques &&  options && ans && location.state.chapterName && location.state.id){
   
    console.log(
      "the subject is ",
      ques,
      options,
      ans,
      location.state.chapterName,
      location.state.id
    );

    let data = {
      ques: ques,
      options: options,
      id: location.state.id,
      ans: ans,
      chapterNo: location.state.chapterName,
    };
    if(options.length!==0){
      addMCQApi(data).then((res) => {
        console.log("the mcq res is ", res);
  
        //location.state.getChapterNo(location.state.chapterName)
        history("/QAset/QAkeyin", {
          state: {
            _id: location.state.id,
            flag: "addnew",
            chapterName: location.state.chapterName,
          },
        });
        // setData(res)
      });
    }
  
  //  }

    // console.log("the totalChapters is ", totalChapters)
    // console.log("the standard is ", standard)
  };

  const onUpdate = () => {
    let data = {
      id: location.state.item._id,
      ques: ques,
      options: options,
      quesId: location.state.data.quesId,
      ans: uans,
      chapterNo: location.state.chapter,
    };
    console.log("the updated objs are", data);

    if (
      location.state.item._id &&
      ques.length !== 0 &&
      options &&
      location.state.data.quesId &&
      uans >= 0 &&
      location.state.chapter
    ) {
      let data = {
        id: location.state.item._id,
        ques: ques,
        options: options,
        quesId: location.state.data.quesId,
        ans: uans,
        chapterNo: location.state.chapter,
      };
      console.log("the updated objs are", data);

      updateMcqApi(data).then((res) => {
        console.log("the message is ", res);
        if (res.message == "success") {
          history("/QAset/QAkeyin", {
            state: {
              _id: location.state.item._id,
              flag: "addnew",
              chapterName: location.state.chapter,
            },
          });
        }

        //setData(res)
      });
    }
  };

  if (location.state.item) {
    return (
      <div className="new">
        <div className="newContainer">
          <div
            className="top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1 style={{ color: "purple" }}>{location.state.chapter}</h1>
            <div style={{ marginRight: "5%", marginTop: "-1%" }}>
              <Button onClick={() => history("/QAset")}>back</Button>
            </div>
          </div>
          <div className="bottom">
            {/* <div className="left">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div> */}
            <div className="right">
              <form>
                <div className="formInput" style={{ width: "100%" }}>
                  <label> Question </label>
                  <input
                    value={ques}
                    style={{ width: "100%", height: "40%", marginTop: "2%" }}
                    type="textarea"
                    onChange={(e) => {
                      setQues(e.target.value);
                      // (e.target.value)
                    }}
                  />
                </div>
                {/* <h1>{standard}</h1> */}
                <div
                  style={{
                    backgroundColor: "#6439ff",
                    padding: 7,
                    color: "white",
                    width: "100%",
                  }}
                >
                  <BlockMath>{ques}</BlockMath>
                </div>

                <div
                  className="formInput"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {options.map((item, index) => {
                    return (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <input
                            type="radio"
                            value={item}
                            checked={options[uans] == item}
                            name="ans"
                            onChange={() => {
                              setUans(index);
                              // console.log("the balue is ",index)
                            }}
                            style={{ height: "20px", width: "20px" }}
                          />
                          <div style={{ marginLeft: "5%" }}>
                            {" "}
                            option {index + 1}{" "}
                          </div>
                        </div>

                        <input
                          value={item}
                          style={{
                            width: "45%",
                            height: "40%",
                            marginTop: "2%",
                          }}
                          type="textarea"
                          onChange={(e) => {
                            //    setOptions(e.target.value)

                            //  let changedarr = options.splice(index,0,e.target.value)

                            let arr = [...options];
                            arr[index] = e.target.value;
                            console.log("the changed arr is", arr);
                            setOptions(arr);
                          }}
                        />
                        <br />
                        <div
                          style={{
                            backgroundColor: "#6439ff",
                            padding: 7,
                            color: "white",
                          }}
                        >
                          <BlockMath>{item}</BlockMath>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <div className="formInput"  style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}} >
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <label> option 3 </label>
                      <input value={option3} style={{width:'45%', height:'40%', marginTop:'2%'}} type="textarea"   onChange={(e)=>{
                        setOption3(e.target.value) 
    
                      } } />
                      <br/>
                      <div style={{backgroundColor:"#6439ff", padding:7, color:'white'}}>
                      <BlockMath >{option3}</BlockMath>
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <label> option 4 </label>
                      <input value={option4} style={{width:'45%', height:'40%', marginTop:'2%'}} type="textarea"   onChange={(e)=>{
                        setOption4(e.target.value) 
    
                      } } />
                      <br/>
                      <div style={{backgroundColor:"#6439ff", padding:7, color:'white'}}>
                      <BlockMath >{option4}</BlockMath>
                      </div>
                       
                    </div>
                   
                     
                      </div> */}
              </form>
              <br />
              <br />
              <center>
                {" "}
                <button
                  style={{
                    paddingInline: 30,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  onClick={onUpdate}
                >
                  Update
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="new">
        <div className="newContainer">
          <div
            className="top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1 style={{ color: "purple" }}>{location.state.chapterName}</h1>
            <div style={{ marginRight: "5%" }}>
              <Button
                onClick={() =>
                  history("/QAset/QAkeyin", {
                    state: {
                      _id: location.state.id,
                      flag: "addnew",
                      chapterName: location.state.chapterName,
                    },
                  })
                }
              >
                back
              </Button>
            </div>
          </div>
          <div className="bottom">
            {/* <div className="left">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div> */}
            <div className="right">
              <form>
                <div className="formInput" style={{ width: "100%" }}>
                  <label> Question </label>
                  <input
                    style={{ width: "100%", height: "40%", marginTop: "2%" }}
                    type="textarea"
                    onChange={(e) => {
                      setQues(e.target.value);
                      // (e.target.value)
                    }}
                  />
                </div>
                {/* <h1>{standard}</h1> */}
                <div
                  style={{
                    backgroundColor: "#6439ff",
                    padding: 7,
                    color: "white",
                  }}
                >
                  <Mathmark>{ques}</Mathmark>
                </div>
                <div
                  className="formInput"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {options.map((item, index) => {
                    return (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <input
                            type="radio"
                            value="Male"
                            name="ans"
                            onChange={() => {
                              setAns(index);
                            }}
                            style={{ height: "20px", width: "20px" }}
                          />
                          <div style={{ marginLeft: "5%" }}>
                            {" "}
                            option {index + 1}{" "}
                          </div>
                        </div>

                        <input
                          style={{
                            width: "45%",
                            height: "40%",
                            marginTop: "2%",
                          }}
                          type="textarea"
                          onChange={(e) => {
                            //    setOptions(e.target.value)

                            //  let changedarr = options.splice(index,0,e.target.value)

                            let arr = [...options];
                            arr[index] = e.target.value;
                            console.log("the changed arr is", arr);
                            setOptions(arr);
                          }}
                        />
                        <br />
                        <div
                          style={{
                            backgroundColor: "#6439ff",
                            padding: 7,
                            color: "white",
                          }}
                        >
                          <BlockMath>{item}</BlockMath>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>
              <br />
              <br />
              <center>
                {" "}
                <button
                  style={{
                    paddingInline: 30,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  onClick={onSave}
                >
                  save
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default QAadd;
