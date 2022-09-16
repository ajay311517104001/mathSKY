import React, { useEffect, useState } from "react";
import { getTestMcqListApi, UpdateTestModuleData } from "../../ApiService";
import { Button, MainHeadingg } from "../../globalStyles";
import { useLocation, useHistory } from "react-router-dom";

import {
  HeroVideo,
  HeroSection,
  HeroTextt,
  HeroTexttt,
  ButtonWrapper,
  HeroButton,
} from "../Hero/HeroStyles";
import MaximizeContent from "../../customhook/max";




const SampleTest = ({testmodule,questionset,totalQuestions,UserId,ProductId,moduleId}) => {
  let history = useHistory();

  let location = useLocation();
  let questions = questionset;
  const [question, setQuestion] = useState(questions[0]);

  const [option, setOption] = useState(-1);
  const [count, setCount] = useState(1);
  const [timer, settimer] = useState(60);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [redirect, setDirect] = useState(0);
  const [StudentAns,setStudentAns]=useState([])

  const fun = (mode) => {
    //console.log("the ans is",questions[count - 1].ans,option)
    if (questions[count - 1].ans == option) {
      setScore(score + 1);

    }else{
      console.log("the question is",question)
      console.log("the right index is",option)
      let QA=question
      QA["selectedAns"]=option
      StudentAns.push(QA)
      setStudentAns(StudentAns)

    }
    setOption(-1);
    console.log(score);
    if (count <= Number(totalQuestions)) {
      setCount(count + 1);
      setQuestion(questions[count]);
      console.log("the timer is", timer);
      // on next click time cut calculation
      if (timer > 1 && timer < 60) {
        let totalTimee = totalTime + (60 - Number(timer));
        console.log("the time captured is", totalTimee);
        setTotalTime(totalTimee);
      }
      //submit button time calculation
      if (timer == 60 && !mode) {
        let totalTimee = totalTime + Number(60);
        console.log("the time captured 60 is", totalTimee);
        setTotalTime(totalTimee);
      }

      settimer(60);
    }
  };
  useEffect(() => {
    const interval = setInterval(fun, 60000);
    return () => clearInterval(interval);
  }, [question]);

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.go(-1);
      }
    };
  }, [history]);
  // useEffect(() => {
  //   if (location.state) {
  //     console.log("the location state-================>", location.state);
  //   }

  //   // getTestMcqListApi()
  //   // .then((res)=>{
  //   //   console.log("the response is ", res)
  //   // })
  // }, []);
  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setOption(target.value);
      console.log("target value", target.value);
    }
  };

  useEffect(() => {
    if (redirect == 1) {
      console.log("the list of worng and unanswerd questions are",StudentAns)
      const data ={
        ProductId:ProductId,
        UserId:UserId,
        moduleId:moduleId,
        score:score,
        timeOfCompletion:totalTime
      }
      UpdateTestModuleData(data)
      .then((res)=>{
        console.log("the updated data res is", res)
      })
      history.push({
        pathname: "/Results",
        state: {
          score: score,
          totalTime: totalTime,
          totalQuestions: totalQuestions,
          correctedQAset:StudentAns
        },
      });
    }
  }, [redirect]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < Number(totalQuestions)) {
        if (timer > 0) {
          settimer(timer - 1);
        }
      } else if (count == Number(totalQuestions)) {
        if (timer > 0) {
          settimer(timer - 1);
        } else {
          let tt = totalTime + 60;
          console.log("the auto submit timer is ", tt);
          setTotalTime(tt);
          setDirect(1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <MaximizeContent>
        <div
          className="questions"
          style={{ backgroundColor: "#02203c", height: "100vh" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "2%",
              paddingBottom: ".5%",
              paddingRight: "10%",
            }}
          >
            <div style={{ marginLeft: "5%" }}>
              <br />
              <HeroTexttt>MATHSKY</HeroTexttt>
            </div>
            <div>
              <HeroTexttt>Left</HeroTexttt>
              <MainHeadingg style={{ color: "white" }}>{timer}</MainHeadingg>
            </div>
          </div>

          <hr />
          <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
            <HeroTextt> {question.ques} </HeroTextt>
            <ul style={{ listStyle: "none" }}>
              <HeroTextt style={{ display: "flex" }}>
                <input
                  type="radio"
                  value="0"
                  checked={option == "0"}
                  onChange={handleChange}
                />{" "}
                <li style={{ marginLeft: "1%" }}>{question.options[0]}</li>{" "}
              </HeroTextt>
              <HeroTextt style={{ display: "flex" }}>
                <input
                  type="radio"
                  value="1"
                  checked={option == "1"}
                  onChange={handleChange}
                />{" "}
                <li style={{ marginLeft: "1%" }}>{question.options[1]}</li>{" "}
              </HeroTextt>
              <HeroTextt style={{ display: "flex" }}>
                <input
                  type="radio"
                  value="2"
                  checked={option == "2"}
                  onChange={handleChange}
                />{" "}
                <li style={{ marginLeft: "1%" }}>{question.options[2]}</li>{" "}
              </HeroTextt>
              <HeroTextt style={{ display: "flex" }}>
                <input
                  type="radio"
                  value="3"
                  checked={option == "3"}
                  onChange={handleChange}
                />{" "}
                <li style={{ marginLeft: "1%" }}>{question.options[3]}</li>{" "}
              </HeroTextt>
            </ul>
          </div>
          <hr />

          {count < Number(totalQuestions) ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "7%",
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  fun("manual");
                }}
              >
                {" "}
                next
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "7%",
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  if (questions[count - 1].ans == option) {
                    setScore(score + 1);
                  }else{
                    console.log("the question is",question)
                    console.log("the right index is",option)
                    let QA=question
                    QA["selectedAns"]=option
                    StudentAns.push(QA)
                    setStudentAns(StudentAns)
              
                  }
              
                  console.log("the submit timer is ", timer);
                  let tt = totalTime + (60 - Number(timer));
                  console.log("the submit timer is ", tt);
                  setTotalTime(tt);

                  setDirect(1);
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </MaximizeContent>
    </>
  );
};

export default SampleTest;
