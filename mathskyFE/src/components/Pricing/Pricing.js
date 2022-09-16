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
import { useLocation, useHistory } from "react-router-dom";

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
import { getQuestionSetApi, updateTestModuleStatus } from "../../ApiService";

function Pricing(props) {
  let location = useLocation();

  console.log("the pricing data", props.testtype);
  let history = useHistory();
  const [type, setType] = useState("");
  const [questionSet, setQuestionSet] = useState([]);
  const [userId,setUserId]=useState("");

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
    }
  }, []);
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

                  history.push({
                    pathname: "/Test",
                    state: {
                      testmodule: location.state.testmodule,
                      questions: questionSet,
                      totalQuestions: questionSet.length,
					  UserId:userId,
					  ProductId:location.state.productId,
					  moduleId: 'M' + moduleId[moduleId.length-1 ]
                    },
                  });
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
export default Pricing;
