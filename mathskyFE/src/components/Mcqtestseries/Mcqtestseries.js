import React, { useEffect, useState } from "react";
import { Button, Container, Section, MainHeading } from "../../globalStyles";
import { Link, Redirect,useParams } from "react-router-dom";
import {
  HeroVideo,
  HeroSection,
  HeroText,
  ButtonWrapper,
  HeroButton,
} from "../Hero/HeroStyles";
import { getSubscriptionInfoApi, getTestModulestatus } from "../../ApiService";
import { useLocation, useHistory } from "react-router-dom";
import { RiLock2Fill, RiLockUnlockFill } from "react-icons/ri";
import axios from "axios";
import {
  FeatureText,
  FeatureTitle,
  FeatureWrapper,
  FeatureColumn,
  FeatureImageWrapper,
  FeatureName,
  FeatureTextWrapper,
} from "../Products/FeaturesStyles";
import { featuresData } from "../../data/FeaturesData";
import Navbar from "../Navbar/Navbar";
import ReactLoading from "react-loading";

const Mcqtestseries = (props) => {
  let {  id } = useParams();

  const iconStyle = (Icon) => <Icon size="5rem" color="#0f0f0f" />;
  let history = useHistory();
  let location = useLocation();
  const initial = {
    y: 40,
    opacity: 0,
  };
  const animate = {
    y: 0,
    opacity: 1,
  };

  const [testmodules, setTestModules] = useState([]);
  const [subcriptionStatus, setSubscriptionStatus] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [testModulesDetails, setTestModulesDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubscriptionInfo = () => {
    console.log("access api called");
    let userId = JSON.parse(localStorage.getItem("userId"));
    getSubscriptionInfoApi({ id: userId,productId:id }).then((data) => {
      console.log("the datat is ",data)
      if (data.status) {
        console.log(
          "this is the subcription Info api data",
          data
        );


        setSubscriptionStatus(true);
        let ModuleDataArr = [];
        for (let j = 0; j < data.list.length; j++) {
          ModuleDataArr.push({
            QAsetId: location.state.QAsetId,
            name: "Test Module " + Number(j + 1),
            description: location.state.productName,
            status: data.list[j].value,
            score: data.list[j].score,
          });
        }
        setTestModules(ModuleDataArr);
        setTestModulesDetails(location.state);
        setLoading(false)


        // console.log("the generated datas are", ModuleDataArr);
        // setTestModules(ModuleDataArr);

        // if (data.length > 0) {
        //   let ModuleDataArr = [];
        //   for (let i = 0; i < data.length; i++) {
        //     if (data[i].productId === location.state._id) {
        //       setSubscriptionStatus(true);
        //       //for loop
        //       // add test moudle dynamic count
        //       //add product name
        //       //status

        //       for (let j = 0; j < data[i].subscriptionList.length; j++) {
        //         ModuleDataArr.push({
        //           QAsetId: location.state.QAsetId,
        //           name: "Test Module " + Number(j + 1),
        //           description: location.state.productName,
        //           status: data[i].subscriptionList[j].value,
        //           score: data[i].subscriptionList[j].score,
        //         });
        //       }
        //       console.log("the generated datas are", ModuleDataArr);
        //       setTestModules(ModuleDataArr);

        //       break;
        //     }
        //   }
        //   setTestModulesDetails(location.state);
        //   setLoading(false)

        // }
         
        
      }else{
              let testmodule = [];
      console.log("hello bro im workign gine",location.state.totalTestModules)
   
      for (let i = 1; i < location.state.totalTestModules + 1; i++) {
        testmodule.push({
          name: "Test Module " + i,
          description: location.state.productName,
        });
      }
      setTestModulesDetails(location.state);
      setTestModules(testmodule);
      setLoading(false)


      }
    });
  };

  useEffect(() => {


    if (location.state) {
      getSubscriptionInfo()
  

   

    

    } else {
      return history.replace("/");
    }
  }, [trigger]);

  function changeBackground(e) {
    e.target.style.color = "white";
    e.target.style.backgroundColor = "green";
  }
  function changeBackgroundleave(e) {
    e.target.style.color = "white";
    e.target.style.backgroundColor = "rgb(2, 32, 60)";
  }

  const initPayment = (
    data,
    userId,
    price,
    productName,
    totalTestModules,
    StdName,
    Subject
  ) => {
    console.log("initpay data", data.amount);
    let { amount } = data;
    const options = {
      key: process.env.KEY,

      amount: price,
      currency: data.currency,
      name: productName,
      description:
        StdName + " - " + Subject + " - " + totalTestModules + " Test Modules",

      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8001/api/orders/verify";
          const { data } = await axios.post(verifyUrl, {
            response,
            id: userId,
            amount: amount,
            totalTestModules: totalTestModules,
            productId: testModulesDetails._id,
          });

          console.log(data);
          if (trigger == 0) {
            setTrigger(1);
          } else {
            setTrigger(0);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (
    price,
    productName,
    totalTestModules,
    StdName,
    Subject
  ) => {
    try {
      let userId = JSON.parse(localStorage.getItem("userId"));
      console.log("the user id is", userId);
      if (userId) {
        const orderUrl = "http://localhost:8001/api/orders/createOrder";
        const { data } = await axios.post(orderUrl, { amount: price });
        console.log(data);
        initPayment(
          data.data,
          userId,
          price,
          productName,
          totalTestModules,
          StdName,
          Subject
        );
      } else {
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "50vh",
          backgroundColor: "#02203c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
    
        {loading ? 

            <center>
            <ReactLoading type="bars" color="#fff" />
          </center>
          : 

          subcriptionStatus == false ? <>
               <MainHeading>{testModulesDetails.productName}</MainHeading>
            <center>
              <HeroText style={{ fontSize: 30 }}>
                Rs.{testModulesDetails.price}
              </HeroText>
              <Button
                onMouseOver={changeBackground}
                onMouseLeave={changeBackgroundleave}
                onClick={() =>
                  handlePayment(
                    testModulesDetails.price,
                    testModulesDetails.productName,
                    testModulesDetails.totalTestModules,
                    testModulesDetails.StdName,
                    testModulesDetails.Subject
                  )
                }
              >
                BUY
              </Button>
            </center></>
       :
       
       <MainHeading>{testModulesDetails.productName}</MainHeading>
  
        }
      
      </div>
      <Section
        position="relative"
        inverse
        id="about"
        ref={props.myRef}
        style={{ padding: 0 }}
      >
        <Container>
          <FeatureWrapper>
            {testmodules.map((el, index) => {
              console.log("the el status is ", el.status);

              if (subcriptionStatus)
                if (el.status == false) {
                  return (
                    <div style={{ cursor: "pointer" }}>
                      <FeatureColumn
                        initial={initial}
                        animate={animate}
                        transition={{ duration: 0.5 + index * 0.1 }}
                        key={index}
                        onClick={() => {
                          console.log("clicked", el);
                          let moduleId = el.name.split(/\s+/);
                          let code = "M" + moduleId[moduleId.length - 1];
                          history.push({
                            pathname: `/TestModule/${location.state._id}/ModuleInfo/${code}`,
                            state: {
                              testmodule: el,
                              testtype: el.name,
                              productId: location.state._id,
                            },
                          });
                        }}
                      >
                        {iconStyle(RiLockUnlockFill)}
                        {/* <FeatureImageWrapper className={el.imgClass}>
												  {el.icon}
											  </FeatureImageWrapper> */}
                        <br />
                        <FeatureName>{el.name}</FeatureName>
                        <FeatureText>{el.description}</FeatureText>
                      </FeatureColumn>
                    </div>
                  );
                } else {
                  return (
                    <div style={{ cursor: "pointer" }}>
                      <FeatureColumn
                        initial={initial}
                        animate={animate}
                        transition={{ duration: 0.5 + index * 0.1 }}
                        key={index}
                        // onClick={() => {
                        //   console.log("clicked", index + 1);

                        //   // history.push({
                        //   //   pathname: "McqTestseriesModule",
                        //   //   state: { testmodule: (index + 1).toString() },
                        //   // });
                        // }}
                      >
                        {iconStyle(RiLockUnlockFill)}
                        {/* <FeatureImageWrapper className={el.imgClass}>
												{el.icon}
											</FeatureImageWrapper> */}
                        <br />
                        <FeatureName>{el.name}</FeatureName>
                        {el.score == -1 ? (
                          <FeatureText>
                            completed the test with 0 score
                          </FeatureText>
                        ) : (
                          <FeatureText>completed</FeatureText>
                        )}
                      </FeatureColumn>
                    </div>
                  );
                }
              else {
                return (
                  <div style={{ cursor: "pointer" }}>
                    <FeatureColumn
                      initial={initial}
                      animate={animate}
                      transition={{ duration: 0.5 + index * 0.1 }}
                      key={index}
                    >
                      {iconStyle(RiLock2Fill)}
                      {/* <FeatureImageWrapper className={el.imgClass}>
	{el.icon}
</FeatureImageWrapper> */}
                      <br />
                      <FeatureName>{el.name}</FeatureName>
                      <FeatureText>{el.description}</FeatureText>
                    </FeatureColumn>
                  </div>
                );
              }
            })}
          </FeatureWrapper>
        </Container>
      </Section>
    </div>
  );
};

export default Mcqtestseries;
