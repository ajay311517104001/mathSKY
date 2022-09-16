import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import { deleteQAsetApi, getProductApi, getQasetApi } from "../../ApiService";
import { useNavigate } from "react-router-dom";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const QAset = () => {
  let history = useNavigate();
  const [QAdata, setQAData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      ModulesApi();
    } else {
      history("/");
    }
  }, []);

  const ModulesApi = () => {
    getQasetApi().then((res) => {
      console.log("the res is ", res);
      setQAData(res);
    });
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <Link to="/QAset/new" style={{ textDecoration: "none" }}>
              <div className="editButton">Add Q&A set</div>
            </Link>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
          }}
        >
          {QAdata.map((data, index) => {
            return (
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  height: "250px",
                  width: "28%",
                  overflow: "scroll",
                  marginTop: "2%",
                  marginLeft: "2%",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  position: "relative",
                }}
                key={index}
              >
                {/* ------------------------------buttons div ----------------------------------- */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    alignItems: "center",
                    marginLeft: "5%",
                  }}
                >
                  <div style={{ textAlign: "start" }}>
                    <Button
                      onClick={() => {
                        console.log("the im clickeddty", data);

                        history("/QAset/QAkeyin", { state: data });
                      }}
                      variant="outlined"
                    >
                      chapters
                    </Button>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ textAlign: "start" }}>
                      <Button
                        onClick={() => {
                          console.log("the im clickeddty", data);

                          history("/QAset/new", { state: data });
                        }}
                        variant="outlined"
                        style={{ marginTop: "3%" }}
                      >
                        {" "}
                        Edit
                      </Button>
                    </div>

                    <div style={{ textAlign: "start", marginLeft: "5%" }}>
                      <Button
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to delete?")
                          ) {
                            deleteQAsetApi(data._id).then((res) => {
                              console.log("the delete qaset api res", res);
                              ModulesApi();
                            });
                          }
                        }}
                        variant="outlined"
                        color="error"
                        style={{ marginTop: "3%" }}
                      >
                        {" "}
                        Bin
                      </Button>
                    </div>
                  </div>
                </div>

                {/* ------------------------------ mcq set details div ----------------------------------- */}
                <div
                  style={{
                    textAlign: "left",
                    width: "70%",
                    marginLeft: "5%",
                    lineHeight: 2,
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "500",
                      color: "#7451f8",
                    }}
                  >
                    {" "}
                    category: {data.category}
                  </h4>
                  <h4 style={{ fontWeight: "500" }}>
                    Subject : {data.Subject}
                  </h4>
                  <h4 style={{ fontWeight: "500" }}>
                    Total Chapters : {data.totalChapters}
                  </h4>
                  <h4 style={{ fontWeight: "500" }}>Std Name:{data.StdName}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QAset;
