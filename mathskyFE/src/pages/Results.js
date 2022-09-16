import { IdTokenClient } from "google-auth-library";
import React, { Component, useEffect, useState } from "react";
import Lottie from "react-lottie";
import tap from "../components/Animations/Tap.json";
import { Button, Container, Section, MainHeading } from "../globalStyles";
import sheepThumbs from "../components/Animations/sheepThumbs.json";

import { useLocation, useHistory ,Redirect} from "react-router-dom";
import {
  FeatureText,
  FeatureTitle,
  FeatureWrapper,
  MCQQuestionDiv,
  FeatureImageWrapper,
  FeatureName,
  FeatureTextWrapper,
  ResultWrapper
} from "../components/Products/FeaturesStyles";
const questions=[   
  {
  "quesId": "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
  "ques": "c1 q2",
  "options": [
      "ds",
      "ggg",
      "afdsds",
      "kjnsad"
  ],
  "ans": 0,
  "selectedAns":-1
},
{
  "quesId": "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
  "ques": "c1 q2",
  "options": [
      "ds",
      "ggg",
      "afdsds",
      "kjnsad"
  ],
  "ans": 0,
  "selectedAns":1
},
{
  "quesId": "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
  "ques": "c1 q2",
  "options": [
      "ds",
      "ggg",
      "afdsds",
      "kjnsad"
  ],
  "ans": 0,
  "selectedAns":1
}
,
{
  "quesId": "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
  "ques": "c1 q2",
  "options": [
      "ds",
      "ggg",
      "afdsds",
      "kjnsad"
  ],
  "ans": 0,
  "selectedAns":0
},
{
  "quesId": "Normally when people ask “how’s it going?” they expect a positive response like “fine” or “good.” If you say “Do you really wanna know?” it means that things are going badly, but you are not sure if the other person wants to listen to your problems or not.",
  "ques": "c1 q2",
  "options": [
      "ds",
      "ggg",
      "afdsds",
      "kjnsad"
  ],
  "ans": 0,
  "selectedAns":2
}

]

const Results = () => {
  let location = useLocation();
  let history = useHistory();
  const [correctedQAset,setCorrectedQAset]=useState([])
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalquestions, setTotalQuestions] = useState(0);

  const initial = {
    y: 40,
    opacity: 0,
  };
  const animate = {
    y: 0,
    opacity: 1,
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    // here is where we will declare lottie animation
    animationData: sheepThumbs,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (location.state) {
      setCorrectedQAset(location.state.correctedQAset)
      console.log("the passed corrected set",location.state.correctedQAset)
      setTotalQuestions(location.state.totalQuestions);
      setScore(location.state.score);
      if (location.state.totalTime > 59) {
        var minutes = Math.floor(location.state.totalTime / 60);
        var seconds = location.state.totalTime - minutes * 60;
        setSeconds(seconds);

        setMinutes(minutes);
      } else {
        setSeconds(location.state.totalTime);
      }
    }else{
      return  	history.go('/')
     }

    return () => {
      if (history.action === "POP") {
         history.push('/testModules/63248d8e81781a0d20cf8369');
     
      }
    };
  });

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
      <Lottie options={defaultOptions} height={300} width={270} />
      <MainHeading>
        {score}/{totalquestions}
      </MainHeading>


        <h2 style={{ color: "white" }}>Duration {minutes}m:{seconds}s</h2>

        </div>

        <Container>
          <ResultWrapper style={{marginBottom:'5%'}}>
            {correctedQAset.map((el, index) => {
                 return (

                      <MCQQuestionDiv
                        initial={initial}
                        animate={animate}
                        transition={{ duration: 0.5 + index * 0.1 }}
                        key={index}
                        onClick={() => {


                        }}
                      >
                       <div style={{display:'flex', flexDirection:'column', lineHeight:1.5}}>
                       <FeatureName>{el.ques}</FeatureName>
                       <br/>
                       {el.options.map((option,index)=>{
                         if(el.selectedAns==-1 ){
                           if(el.ans==index){
                            return( <FeatureName style={{marginLeft:0,backgroundColor:'green',lineHeight:1.5,color:'white'} }    key={index}  >{index+1}) {option}</FeatureName>)

                           }else{
                            return( <FeatureName style={{marginLeft:0} }    key={index}  >{index+1}) {option}</FeatureName>)

                           }


                         }else{
                          if(el.ans==index){
                            return( <FeatureName style={{marginLeft:0,backgroundColor:'green',lineHeight:1.5,color:'white'} }    key={index}  >{index+1}) {option}</FeatureName>)

                           }
                           else if(el.selectedAns==index){
                            return( <FeatureName style={{marginLeft:0,backgroundColor:"red",lineHeight:1.5} }    key={index}  >{index+1}) {option}</FeatureName>)

                           }
                           else{
                            return( <FeatureName style={{marginLeft:0,lineHeight:1.5} }    key={index}  >{index+1}) {option}</FeatureName>)

                           }

                        
        
            }})}
                       
                   
                       </div>
                      
                      </MCQQuestionDiv>
            )})}
                    </ResultWrapper>
                    </Container>



    </div>
  );
};

export default Results;

// <>

// <Lottie options={defaultOptions} height="20%" width="15%"  style={{marginTop:'5%'}}/>

// <p>Your score is : {score}</p>
// <p>{location.state.totalTime}</p>
// <p>mins:{minutes}m</p>
// <p>sec:{seconds}s</p>
// </>
