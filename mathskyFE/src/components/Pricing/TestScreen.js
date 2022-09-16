import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  TextWrapper,
  MainHeading,
} from "../../globalStyles";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

import {
  HeroVideo,
  HeroSection,
  HeroText,
  ButtonWrapper,
  HeroButton,
} from "../Hero/HeroStyles";
import { useLocation, useHistory ,useParams} from "react-router-dom";

import {
  PricingSection,
  PricingWrapper,
  PricingContainer,
  PricingCardInfo,
  PricingCardPlan,
  PricingCardCost,
  PricingCardFeatures,
  PricingCardText,
  PricingCardFeature,
  PricingCard,
} from "./PricingStyles";
import { pricingData } from "../../data/PricingData";
import { getQuestionSetApi, updateTestModuleStatus ,getSubscriptionInfoApi, getTestModulestatus} from "../../ApiService";
import SampleTest from "./SampleTest";

function TestScreen() {
  let {modulesName,id} =useParams()
  let location = useLocation();
 

  let history = useHistory();
  const [type, setType] = useState("");
  const [questionSet, setQuestionSet] = useState([]);
  const [userId,setUserId]=useState("");
  const [stages,setStage]=useState('s1')



useEffect(()=>{
  let userId = JSON.parse(localStorage.getItem("userId"));
    if(userId){
      const data ={
        id:userId,
        productId:id,
        moduleId:modulesName
      }
      getTestModulestatus(data)
      .then((res)=>{
        if(res.value){
          return  	history.goBack()
        }
      })
    }

},[])

  useEffect(() => {
  
    console.log("the pricingggggggg data", location.state);
	if(localStorage.getItem('userId')){
		setUserId(JSON.parse(localStorage.getItem('userId'))) 
	}
    if (location.state) {
      let data = {
        id: location.state.testmodule.QAsetId,
      };
      getQuestionSetApi(data).then((res) => {
        // error prone
        console.log("the res is qid ", res);
        setQuestionSet(res);
      });

      console.log("the location state", location.state);
      setType(location.state.testtype);
    }else{
      return  	history.replace('/')
    }
  }, [stages]);


  if(stages=='s1'){
    return (
      <HeroSection>
        <HeroVideo />
        <Container>
          {type == "" ? (
            <MainHeading>Ready to take the Sample test?</MainHeading>
          ) : (
            <MainHeading>Ready to take the {type} ?</MainHeading>
          )}
          <HeroText>
            This test module contains 14 MCQ questions from 10th Samacheer Kalvi
            syllabus
          </HeroText>
          <ButtonWrapper>
            {type == "" ? (
              <Button>START</Button>
            ) : (
              <Button
                onClick={
                  () => {
            let moduleId =location.state.testtype.split(/\s+/)
            
                    console.log("this is clicked",'M'+moduleId[moduleId.length-1 ]);
            const data ={
            ProductId:location.state.productId,
            UserId:userId,
            moduleId: 'M' + moduleId[moduleId.length-1 ]
            }
            updateTestModuleStatus(data)
            .then((res)=>{
              console.log("the res is ",res)
            })
              setStage('s2')
              console.log("the id is",)
              //       history.push({
              //         pathname: "/Test",
              //         state: {
              //           testmodule: location.state.testmodule,
              //           questions: questionSet,
              //           totalQuestions: questionSet.length,
              // UserId:userId,
              // ProductId:location.state.productId,
              // moduleId: 'M' + moduleId[moduleId.length-1 ]
              //         },
              //       });
                  }
  
                  //update the subscription of the test module
                }
              >
                START
              </Button>
            )}
  
            {/* <HeroButton>Find More</HeroButton> */}
          </ButtonWrapper>
        </Container>
      </HeroSection>
    );
  }
  else if(stages=='s2'){
    console.log("the qaset is",questionSet)
    let moduleId =location.state.testtype.split(/\s+/)
    const prop ={
      testmodule: location.state.testmodule,
      questionset: questionSet,
      totalQuestions: questionSet.length,
      UserId:userId,
      ProductId:location.state.productId,
      moduleId: 'M' + moduleId[moduleId.length-1 ]
    }
    return(<SampleTest {...prop} />)
  }
 
}
export default TestScreen;
