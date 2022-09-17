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
import { useLocation, useHistory, useParams } from "react-router-dom";

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
import {
  getQuestionSetApi,
  updateTestModuleStatus,
  getSubscriptionInfoApi,
  getTestModulestatus,
} from "../../ApiService";
import SampleTest from "./SampleTest";
import Results from "../../pages/Results";
import ReactLoading from "react-loading";


function TestScreen() {
  let { modulesName, id } = useParams();
  let location = useLocation();

  let history = useHistory();
  const [type, setType] = useState("");
  const [questionSet, setQuestionSet] = useState([]);
  const [userId, setUserId] = useState("");
  const [stage, setStage] = useState("s1");
  const [resultScreenProp, setResultScreenProp] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const ResultScreenProps = (properties) => {
    console.log("the result screen props are", properties);
    setResultScreenProp(properties);
    setStage("s3");
  };

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      const data = {
        id: userId,
        productId: id,
        moduleId: modulesName,
      };
      getTestModulestatus(data).then((res) => {
        if (res.value) {
          setToast("Test successfylly Taken");
          setLoading(false);
          //test already taken go back
        } else {
          //get the qaset and enable the start button
          setToast("proceed");
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("the pricingggggggg data", location.state);
    if (localStorage.getItem("userId")) {
      setUserId(JSON.parse(localStorage.getItem("userId")));
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
    } else {
      return history.replace("/");
    }
  }, [stage]);

  if (stage == "s1") {
    return (
      <HeroSection>
        <HeroVideo />
        <Container>
          {loading ? (
            <center>
              <ReactLoading type="bars" color="#fff" />
            </center>
          ) : toast == "Test successfylly Taken" ? (
            <MainHeading>Test successfylly Taken</MainHeading>
          ) : (
            toast == "proceed" && (
              <>
                <MainHeading>Ready to take the {type} ?</MainHeading>
                <HeroText>
                  This test module contains 14 MCQ questions from 10th Samacheer
                  Kalvi syllabus
                </HeroText>
                <ButtonWrapper>
                  <Button
                    onClick={
                      () => {
                        let moduleId = location.state.testtype.split(/\s+/);

                        console.log(
                          "this is clicked",
                          "M" + moduleId[moduleId.length - 1]
                        );
                        const data = {
                          ProductId: location.state.productId,
                          UserId: userId,
                          moduleId: "M" + moduleId[moduleId.length - 1],
                        };
                        updateTestModuleStatus(data).then((res) => {
                          console.log("the res is ", res);
                        });
                        setStage("s2");
                        console.log("the id is");
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

                  {/* <HeroButton>Find More</HeroButton> */}
                </ButtonWrapper>
              </>
            )
          )}
        </Container>
      </HeroSection>
    );
  } else if (stage == "s2") {
    console.log("the qaset is", questionSet);
    let moduleId = location.state.testtype.split(/\s+/);
    const prop = {
      testmodule: location.state.testmodule,
      questionset: questionSet,
      totalQuestions: questionSet.length,
      UserId: userId,
      ProductId: location.state.productId,
      moduleId: "M" + moduleId[moduleId.length - 1],
      ResultScreenProps: ResultScreenProps,
    };
    return <SampleTest {...prop} />;
  } else if (stage == "s3") {
    return <Results {...resultScreenProp} />;
  }
}
export default TestScreen;
