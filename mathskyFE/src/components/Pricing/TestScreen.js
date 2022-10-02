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
  const [stdname,setStdName]=useState('');

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
        setQuestionSet(res.McqTestList);
  //      setQuestionSet(

  // [
  //           {
  //               "quesId": "497678b8-aa31-476e-b500-bd8dbd54e819",
  //               "ques": "\\text {Let } f \\text { and } g \\text { be two functions given by } f = \\{(0,1),(2,0),(3,−4),(4,2),(5,7)\\} \\text { } g =\\{(0,2),(1,0),(2,4),(−4,2),(7,0)\\} \\text { then the range of } f \\circ g \\text { is }",
  //               "options": [
  //                   "\\{0,2,3,4,5\\}",
  //                   "\\{–4,1,0,2,7\\}",
  //                   "\\{1,2,3,4,5\\}",
  //                   "\\{0,1,2\\}"
  //               ],
  //               "ans": 3
  //           },
  //           {
  //               "quesId": "bf04ed4d-f1a2-40ba-b7dd-59fc9a1999bc",
  //               "ques": "\\text { The next term of the sequence } \\frac{3}{16}, \\frac{1}{8}, \\frac{1}{12}, \\frac{1}{18}, \\cdots \\text { is }",
  //               "options": [
  //                   " \\frac{1}{24}",
  //                   " \\frac{1}{27}",
  //                   " \\frac{2}{3}",
  //                   " \\frac{1}{18}"
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "58a4efb9-400a-4b4e-b255-953cc777cc8e",
  //               "ques": "\\text { Euclid’s division lemma states that for positive integers } a \\text { and } b, \\text { there exist unique integers } q \\text { and } r \\text { such that } a = bq + r \\text { , where r must satisfy. }",
  //               "options": [
  //                   "1<r <b",
  //                   "0<r <b",
  //                   "0 \\leq r <b",
  //                   "0<r ≤b"
  //               ],
  //               "ans": 2
  //           },
  //           {
  //               "quesId": "2c64cc20-9b8b-4bd9-a8e2-94efc0b5267f",
  //               "ques": "\\text { If number of columns and rows are not equal in a matrix then it is said to be a }",
  //               "options": [
  //                   "\\text { diagonal matrix}",
  //                   "\\text {  rectangular matrix }",
  //                   "\\text {  square matrix }",
  //                   "\\text { identity matrix }"
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "e12b59d0-afb7-46dd-aae5-a871049f7582",
  //               "ques": "\\text { Which of the following can be calculated from the given matrices }  \\mathrm{A}=\\left(\\begin{array}{cc} 1 & 2\\\\ 3 & 4 \\\\ 5 & 6 \\end{array}\\right) \\mathrm{B}=\\left(\\begin{array}{ccc} 1 & 2 & 3  \\\\ 4 & 5 & 6  \\\\ 7 & 8 & 9  \\end{array}\\right), \\text { (i) } A^2 \\text { (ii) } B^2 \\text { (iii) }AB \\text { (iv) } BA",
  //               "options": [
  //                   "\\text { (i) and (ii) only }",
  //                   "\\text { (ii) and (iii) only }",
  //                   "\\text {  (ii) and (iv) only }",
  //                   "\\text {all of these}"
  //               ],
  //               "ans": 2
  //           },
  //           {
  //               "quesId": "e4cc8c04-e984-4824-b8da-c3a6f6e5c189",
  //               "ques": "y^2 + \\frac{1}{y^2} \\text { is not equal to } ",
  //               "options": [
  //                   "\\frac {y^4+1}{y^2}",
  //                   "\\Bigg( y + \\frac{1}{y} \\Bigg)^2",
  //                   "\\Bigg( y - \\frac{1}{y} \\Bigg)^2+2",
  //                   "\\Bigg( y + \\frac{1}{y} \\Bigg)^2-2"
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "f0dfc105-e11f-4adb-98ef-9604af82affd",
  //               "ques": "\\text { If } \\Delta ABC \\text { is an isosceles triangle with } \\angle C = 90° \\text { and } AC = 5 cm \\text { , then AB is }",
  //               "options": [
  //                   "2.5 cm",
  //                   "5 cm",
  //                   "10cm",
  //                   "5 \\sqrt 2 cm"
  //               ],
  //               "ans": 3
  //           },
  //           {
  //               "quesId": "46808e75-0966-46a1-89ce-f21b033c20ca",
  //               "ques": "\\text { In figure if } PR \\text { is tangent to the circle at } P \\text { and }O \\text { is the centre of the circle, then } \\angle POQ \\text { is }",
  //               "options": [
  //                   "120°",
  //                   "100°",
  //                   "110°",
  //                   "90°"
  //               ],
  //               "ans": 0
  //           },
  //           {
  //               "quesId": "b0f20836-6619-4ec1-9275-48e067ea3330",
  //               "ques": "\\text{ When proving that a quadrilateral is a trapezium, it is necessary to show }",
  //               "options": [
  //                   " \\text{ Two sides are parallel. }",
  //                   "\\text{ Two parallel and two non-parallel sides.}",
  //                   "\\text{ Opposite sides are parallel. }",
  //                   "\\text{ All sides are of equal length.} "
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "bcae8081-0c4a-49dc-8e60-b7dd04023961",
  //               "ques": "\\text{ A straight line has equation }8y=4x+21.\\text{  Which of the following is true }",
  //               "options": [
  //                   "\\text{ The slope is }0.5 \\text{ and the y intercept is }2.6",
  //                   "\\text{ The slope is }5 \\text{ and the y intercept is }1.6",
  //                   "\\text{ The slope is }0.5 \\text{ and the y intercept is }1.6",
  //                   "\\text{ The slope is }5 \\text{ and the y intercept is }2.6"
  //               ],
  //               "ans": 0
  //           },
  //           {
  //               "quesId": "76d6d970-3d8e-4023-9e61-5694c8ff5bcb",
  //               "ques": "\\text { The value of } \\sin^2\\theta + \\frac {1}{ 1+ tan ^ 2 \\theta} \\text { is equal to}",
  //               "options": [
  //                   "\\tan^2\\theta",
  //                   "1",
  //                   "\\cot^2 \\theta",
  //                   "0"
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "1ef2d788-905b-4234-a3dc-2308b55779e5",
  //               "ques": "\\text { A frustum of a right circular cone is of height 16cm with radii of its ends as 8cm and 20cm. Then, the volume of the frustum is  }",
  //               "options": [
  //                   "3328\\pi cm^3",
  //                   "3228\\pi cm^3",
  //                   "3340\\pi cm^3",
  //                   "3340\\pi cm^3"
  //               ],
  //               "ans": 0
  //           },
  //           {
  //               "quesId": "76f64adb-3132-4a5c-90d6-2eb20d4a6347",
  //               "ques": "\\text {The height and radius of the cone of which the frustum is a part are } h_1 \\text{ units and }r_1 \\text { units respectively. Height of the frustum is }h_2\\text{ units and radius of the smaller base is }r_2\\text{ units. If }h_2:h_1= 1:2\\text{ then }r_2: r_1 \\text{ is }",
  //               "options": [
  //                   " 1:3",
  //                   " 1:2",
  //                   " 2:1",
  //                   "3:1"
  //               ],
  //               "ans": 1
  //           },
  //           {
  //               "quesId": "798398d8-c48f-476c-b0ee-dc6314a205af",
  //               "ques": "\\text { If a letter is chosen at random from the English alphabets \\{a,b,...,z\\}, then the probability that the letter chosen precedes }  x ",
  //               "options": [
  //                   "\\frac {12}{13}",
  //                   "\\frac {1}{13}",
  //                   "\\frac {23}{26}",
  //                   "\\frac {3}{26}"
  //               ],
  //               "ans": 2
  //           }
  //       ]
  //   )
        setStdName(res.StdName)
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
        <Container style={{backgroundColor:'#02203c'}}>
          {loading ? (
            <center>
              <ReactLoading type="bars" color="#fff" />
            </center>
          ) : toast == "Test successfylly Taken" ? (
            <MainHeading>Test successfully Completed</MainHeading>
          ) : (
            toast == "proceed" && (
              <>
                <MainHeading>Ready to take the {type} ?</MainHeading>
                <HeroText>
                  This test module contains  {questionSet.length}  MCQ questions from {stdname} Samacheer
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
