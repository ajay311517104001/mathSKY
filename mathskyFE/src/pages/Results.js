import { IdTokenClient } from "google-auth-library";
import React, { Component, useEffect, useState } from "react";
import Lottie from "react-lottie";
import tap from "../components/Animations/Tap.json";
import Button from '@mui/material/Button';

import {  Container, Section, MainHeading } from "../globalStyles";
import sheepThumbs from "../components/Animations/sheepThumbs.json";
import cry from "../components/Animations/cry.json";
import bear from "../components/Animations/bear.json";
import { MathComponent } from "mathjax-react";
import MathJax from "react-mathjax";


import { useLocation, useHistory, Redirect } from "react-router-dom";
import {
  FeatureText,
  FeatureTitle,
  FeatureWrapper,
  MCQQuestionDiv,
  FeatureImageWrapper,
  FeatureName,
  FeatureTextWrapper,
  ResultWrapper,
} from "../components/Products/FeaturesStyles";
const questions = [
  {
    quesId:
      "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
    ques: "c1 q2",
    options: ["ds", "ggg", "afdsds", "kjnsad"],
    ans: 0,
    selectedAns: -1,
  },
  {
    quesId:
      "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
    ques: "c1 q2",
    options: ["ds", "ggg", "afdsds", "kjnsad"],
    ans: 0,
    selectedAns: 1,
  },
  {
    quesId:
      "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
    ques: "c1 q2",
    options: ["ds", "ggg", "afdsds", "kjnsad"],
    ans: 0,
    selectedAns: 1,
  },
  {
    quesId:
      "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
    ques: "c1 q2",
    options: ["ds", "ggg", "afdsds", "kjnsad"],
    ans: 0,
    selectedAns: 0,
  },
  {
    quesId:
      "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
    ques: "c1 q2",
    options: ["ds", "ggg", "afdsds", "kjnsad"],
    ans: 0,
    selectedAns: 2,
  },
];

const Results = ({
  scoreSecured,
  totalTime,
  totalQuestions,
  correctedQAsetprop,
}) => {
  let location = useLocation();
  let history = useHistory();
  const [correctedQAset, setCorrectedQAset] = useState([]);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalquestions, setTotalQuestions] = useState(0);
  const [animation,setAnimation]=useState(0);
const [hint,setHint]=useState(-1)
const [error,setError]=useState(false)
const [loading,setloading]=useState(false)
  const initial = {
    y: 40,
    opacity: 0,
  };
  const animate = {
    y: 0,
    opacity: 1,
  };


  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    // here is where we will declare lottie animation
    animationData: sheepThumbs,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // useEffect(()=>{
  //   return () => {
  //     if (history.action === "POP") {
  //        history.push('/testModules/63248d8e81781a0d20cf8369');

  //     }
  //   };

  // },[])

 const defaultOptions2 = {
    loop: true,
    autoplay: true,
    // here is where we will declare lottie animation
    animationData: bear,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    // here is where we will declare lottie animation
    animationData: cry,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

  useEffect(() => {
    const percent =percentage(scoreSecured,totalQuestions);
    if(percent>80){
      setAnimation(1)
    }else if(percent>50){
      setAnimation(2)
    }else{
      setAnimation(3)
    }
    setCorrectedQAset(correctedQAsetprop);
    console.log("the passed corrected set", correctedQAsetprop);
    setTotalQuestions(totalQuestions);
    setScore(scoreSecured);
    if (totalTime > 59) {
      var minutes = Math.floor(totalTime / 60);
      var seconds = totalTime - minutes * 60;
      setSeconds(seconds);

      setMinutes(minutes);
    } else {
      setSeconds(totalTime);
    }

    // return () => {
    //   if (history.action === "POP") {
    //       // history.push('/testModules/63248d8e81781a0d20cf8369');
    //       history.go(0)

    //   }
    // };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "65vh",
          backgroundColor: "#02203c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {
          animation==1?
          <Lottie options={defaultOptions1} height={300} width={270} />


          :
          animation==2?
          <Lottie options={defaultOptions2} height={300} width={270} />

          :
          <Lottie options={defaultOptions3} height={300} width={270} />

        }

        <MainHeading>
          {score}/{totalquestions}
        </MainHeading>

        <h2 style={{ color: "white" }}>
          Duration {minutes}m:{seconds}s
        </h2>
      </div>

      <Container>
        <ResultWrapper style={{ marginBottom: "5%" }}>
          {correctedQAset.map((el, index) => {
            return (

              <MCQQuestionDiv
                initial={initial}
                animate={animate}
                transition={{ duration: 0.5 + index * 0.1 }}
                key={index}
                style={{marginTop:'2%'}}
                onClick={() => {}}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.5,
                   
                  }}
                >
                  <div style={{overflow:'auto', backgroundColor:'rgb(2, 32, 60)', color:'white', borderRadius:10}}>
                  <MathComponent   tex={el.ques} /> 
                  {/* <MathJax.Node formula={el.ques} /> */}

                  </div>



                  <br />
                  {el.options.map((option, index) => {
                    if (el.selectedAns == -1) {
                      if (el.ans == index) {
                        return (
                          <FeatureName
                            style={{
                              marginLeft: 0,
                              backgroundColor: "green",
                              lineHeight: 1.5,
                              borderRadius:10,
                              color: "white",
                              overflow:'auto'
                            }}
                            key={index}
                          >
                            {index + 1}) <MathComponent  display ={false} tex={option}/>
                          </FeatureName>
                        );
                      } else {
                        return (
                          <FeatureName style={{ marginLeft: 0 ,    overflow:'auto' }} key={index}>
                            {index + 1}) <MathComponent  display ={false} tex={option}/>
                          </FeatureName>
                        );
                      }
                    } else {
                      if (el.ans == index) {
                        return (
                          <FeatureName
                            style={{
                              marginLeft: 0,
                              backgroundColor: "green",
                              lineHeight: 1.5,
                              color: "white",
                              overflow:'auto'
                            }}
                            key={index}
                          >
                            {index + 1}) <MathComponent  display ={false} tex={option}/>
                          </FeatureName>
                        );
                      } else if (el.selectedAns == index) {
                        return (
                          <FeatureName
                            style={{
                              marginLeft: 0,
                              backgroundColor: "red",
                              lineHeight: 1.5,
                              overflow:'auto'
                            }}
                            key={index}
                          >
                            {index + 1})<MathComponent  display ={false} tex={option}/>
                          </FeatureName>
                        );
                      } else {
                        return (
                          <FeatureName
                            style={{ marginLeft: 0, lineHeight: 1.5 ,    overflow:'auto'}}
                            key={index}
                          >
                            {index + 1}) <MathComponent  display ={false} tex={option}/>
                          </FeatureName>
                        );
                      }
                    }
                  })}
                </div>
                <br/>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button variant="outlined" onClick={()=>
                  {
                    if(hint==index){ setHint(-1)}
                    else{
                      setHint(index)
                      setError(false)
                      setloading(true)
                    }
                  }
                 }> {hint ==index ? 'Hide' : 'Hint'}</Button>
                </div>
                <br/>
                {
                  hint==index &&
                  <div style={{ display:'flex', justifyContent:'center'}}>
                    <div style={{ overflow:'auto'}} >
                      
                    {    error && <center><h4>Hint will be updated soon!</h4></center>
                    }
                        
                       { !error && loading && <center><h4>Loading...</h4></center>  }
                        
          <img
           src={`https://drive.google.com/uc?export=view&id=${el.imageId}`}
          // src='https://drive.google.com/uc?export=view&id=1ZiosQdRPPhwdnyNzW9GILlt_Uj5PPioF'
       
            alt=""
              onLoad={()=>setloading(false)}
              loading="lazy"
              height={'200'}
style={{pointerEvents:'none'}}
              onError={()=>{
                console.log("err")
                setError(true)
              }}

            />
                      
          
                    </div>
         
                  </div>
                }
            
              </MCQQuestionDiv>

            );
          })}
        </ResultWrapper>
      </Container>
    </div>
  );
};

export default Results;
