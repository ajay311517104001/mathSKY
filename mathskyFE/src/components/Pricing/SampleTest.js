import React, { useEffect, useState } from "react";
import { getTestMcqListApi, UpdateTestModuleData } from "../../ApiService";
import { Button, MainHeadingg,MainHeadingl } from "../../globalStyles";
import { useLocation, useHistory } from "react-router-dom";

import {
  HeroVideo,
  HeroSection,
  HeroTextt,
  HeroTexttt,
  HeroTextttl,
  ButtonWrapper,
  HeroTexttl,
  HeroButton,
} from "../Hero/HeroStyles";
import MaximizeContent from "../../customhook/max";

import { InlineMath, BlockMath } from 'react-katex';
import { MathComponent, useMathJax } from "mathjax-react";
import MathJax from "react-mathjax";
// import  {Latex} from 'react-latex');
//import { InlineTex } from 'react-tex';

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { borderColor } from "@mui/system";



// const SampleTest = ({testmodule,questionset,totalQuestions,UserId,ProductId,moduleId,ResultScreenProps}) => {
//   let history = useHistory();

//   let location = useLocation();
//   let questions = questionset;
//   const [question, setQuestion] = useState(questions[0]);

//   const [option, setOption] = useState(-1);
//   const [count, setCount] = useState(1);
//   const [timer, settimer] = useState(60);
//   const [score, setScore] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [redirect, setDirect] = useState(0);
//   const [StudentAns,setStudentAns]=useState([])

//   const fun = (mode) => {
//     console.log("the option is",question.ans,option)
//     if (question.ans == option) {
//       setScore(score + 1);

//     }else{
//      // console.log("the question is",question)
//       //console.log("the right index is",option)
//       let QA=question
//       QA["selectedAns"]=option
//       StudentAns.push(QA)
//       setStudentAns(StudentAns)

//     }
//     setOption(-1);
//     console.log("the score is ",score);
//     if (count <= Number(totalQuestions)) {
//       setCount(count + 1);
//       setQuestion(questions[count]);
//      // console.log("the timer is", timer);
//       // on next click time cut calculation
//       if (timer > 1 && timer < 60) {
//         let totalTimee = totalTime + (60 - Number(timer));
//       //  console.log("the time captured is", totalTimee);
//         setTotalTime(totalTimee);
//       }
//       //submit button time calculation
//       if (timer == 60 && !mode) {
//         let totalTimee = totalTime + Number(60);
//       //  console.log("the time captured 60 is", totalTimee);
//         setTotalTime(totalTimee);
//       }

//       settimer(60);
//     }
//   };
//   useEffect(() => {
//     const interval = setInterval(fun, 60000);
//     return () => clearInterval(interval);
//   }, [question]);

//   useEffect(() => {
//     return () => {
//       if (history.action === "POP") {
//         history.go(-1);
//       }
//     };
//   }, [history]);
//   // useEffect(() => {
//   //   if (location.state) {
//   //     console.log("the location state-================>", location.state);
//   //   }

//   //   // getTestMcqListApi()
//   //   // .then((res)=>{
//   //   //   console.log("the response is ", res)
//   //   // })
//   // }, []);
//   const handleChange = (e) => {
//     const target = e.target;
//     if (target.checked) {
//       setOption(target.value);
//     //  console.log("target value", target.value);
//     }
//   };

//   useEffect(() => {
//     if (redirect == 1) {
//    //   console.log("the score is",score)
//       const data ={
//         ProductId:ProductId,
//         UserId:UserId,
//         moduleId:moduleId,
//         scoreSecured:score,
//         timeOfCompletion:totalTime
//       }
//       UpdateTestModuleData(data)
//       .then((res)=>{
//       //  console.log("the updated data res is", res)
//       })
//       let properties = {
//         scoreSecured: score,
//         totalTime: totalTime,
//         totalQuestions: totalQuestions,
//         correctedQAsetprop:StudentAns
//       }
//       ResultScreenProps(properties)
      
//       // history.push({
//       //   pathname: "/Results",
//       //   state: {
//       //     score: score,
//       //     totalTime: totalTime,
//       //     totalQuestions: totalQuestions,
//       //     correctedQAset:StudentAns
//       //   },
//       // });
//     }
//   }, [redirect]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (count < Number(totalQuestions)) {
//         if (timer > 0) {
//           settimer(timer - 1);
//         }
//       } else if (count == Number(totalQuestions)) {
//         if (timer > 0) {
//           settimer(timer - 1);
//         } else {
//           let tt = totalTime + 60;
//         // console.log("the auto submit timer is ", tt);
//           setTotalTime(tt);
//           setDirect(1);
//         }
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   return (
//     <>
//       <MaximizeContent>
//         <div
  
//           style={{ backgroundColor: "#02203c", height: "100vh" }}
//         >

//           {/* ------------------Header--------------------------- */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               paddingTop: "2%",
//               paddingBottom: ".5%",
//               paddingRight: "10%",
//             }}
//           >
//             <div style={{ marginLeft: "5%" }}>
//               <br />
//               <HeroTexttt>Centum</HeroTexttt>
//             </div>
            
//             <div>
//               <HeroTexttt>Left</HeroTexttt>
//               <MainHeadingg style={{ color: "white" }}>{timer}</MainHeadingg>
//             </div>
//           </div>

//           <hr />

//           {/* ------------------- mid section ---------------------- */}
//           <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>

//             <div style={{ display:'flex', justifyContent:'flex-start'}}>
//         {/* <HeroTextt style={{backgroundColor:'red'}}> <BlockMath>{question.ques}</BlockMath> </HeroTextt> */}
   
//          <div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' , 	overflow:'auto',color:' #fff', marginLeft:'1%'
//  }}>   <MathComponent    tex={question.ques} /></div > 
//          {/* <MathJax.Provider>
//            <div style={{backgroundColor:'red'}}>
//            <MathJax.Node formula={question.ques} />
//            </div>
//            </MathJax.Provider>  */}


//             </div>


//     {/* ------------------- options section ---------------------- */}


//             <ul style={{ listStyle: "none", display:'flex' , flexDirection:'row' }}>
//               <HeroTexttl style={{ display: "flex" }}>
//                 <input
//                   type="radio"
//                   value="0"
//                   checked={option == "0"}
//                   onChange={handleChange}
//                 />{" "}
//                 <li style={{ marginLeft: "1%" }}>   <MathComponent tex={question.options[0]} /></li>{" "}
//               </HeroTexttl>
//               <HeroTexttl style={{ display: "flex" }}>
//                 <input
//                   type="radio"
//                   value="1"
//                   checked={option == "1"}
//                   onChange={handleChange}
//                 />{" "}
//                 <li style={{ marginLeft: "1%" }}><MathComponent tex={question.options[1]} /></li>{" "}
//               </HeroTexttl>
//               <HeroTexttl style={{ display: "flex" }}>
//                 <input
//                   type="radio"
//                   value="2"
//                   checked={option == "2"}
//                   onChange={handleChange}
//                 />{" "}
//                 <li style={{ marginLeft: "1%" }}><MathComponent tex={question.options[2]} /></li>{" "}
//               </HeroTexttl>
//               <HeroTexttl style={{ display: "flex" }}>
//                 <input
//                   type="radio"
//                   value="3"
//                   checked={option == "3"}
//                   onChange={handleChange}
//                 />{" "}
//                 <li style={{ marginLeft: "1%" }}><MathComponent tex={question.options[3]} /></li>{" "}
//               </HeroTexttl>
//             </ul>

//           </div>
//           <hr />


// {/* ---------------------------------- footer -------------------------------*/}
//           {count < Number(totalQuestions) ? (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "7%",
//                 backgroundColor:'blue'
//               }}
//             >
//               <Button
//                 style={{ color: "white" }}
//                 onClick={() => {
//                   fun("manual");
//                 }}
//               >
//                 {" "}
//                 next
//               </Button>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "7%",
//               }}
//             >
//               <Button
//                 style={{ color: "white" }}
//                 onClick={() => {
//                   if (questions[count - 1].ans == option) {
//                     setScore(score + 1);
//                   }else{
//                    // console.log("the question is",question)
//                   //  console.log("the right index is",option)
//                     let QA=question
//                     QA["selectedAns"]=option
//                     StudentAns.push(QA)
//                     setStudentAns(StudentAns)
              
//                   }
              
//                 //  console.log("the submit timer is ", timer);
//                   let tt = totalTime + (60 - Number(timer));
//                  // console.log("the submit timer is ", tt);
//                   setTotalTime(tt);

//                   setDirect(1);
//                 }}
//               >
//                 Submit
//               </Button>
//             </div>
//           )}
//         </div>
//       </MaximizeContent>
//     </>
//   );
// };

// export default SampleTest;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //  padding: theme.spacing(5),
    height: "18vh",
  textAlign: "center",
  color: theme.palette.text.secondary,
  // boxShadow:' 1px 1px #888888'
  boxShadow:'none'
  

}));


const SampleTest = ({testmodule,questionset,totalQuestions,UserId,ProductId,moduleId,ResultScreenProps}) => {
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
    console.log("the option is",question.ans,option)
    if (question.ans == option) {
      setScore(score + 1);

    }else{
     // console.log("the question is",question)
      //console.log("the right index is",option)
      let QA=question
      QA["selectedAns"]=option
      StudentAns.push(QA)
      setStudentAns(StudentAns)

    }
    setOption(-1);
    console.log("the score is ",score);
    if (count <= Number(totalQuestions)) {
      setCount(count + 1);
      setQuestion(questions[count]);
     // console.log("the timer is", timer);
      // on next click time cut calculation
      if (timer > 1 && timer < 60) {
        let totalTimee = totalTime + (60 - Number(timer));
      //  console.log("the time captured is", totalTimee);
        setTotalTime(totalTimee);
      }
      //submit button time calculation
      if (timer == 60 && !mode) {
        let totalTimee = totalTime + Number(60);
      //  console.log("the time captured 60 is", totalTimee);
        setTotalTime(totalTimee);
      }

      settimer(60);
    }
  };

  const onSubmit =()=>{
    
      if (questions[count - 1].ans == option) {
        setScore(score + 1);
      }else{
       // console.log("the question is",question)
      //  console.log("the right index is",option)
        let QA=question
        QA["selectedAns"]=option
        StudentAns.push(QA)
        setStudentAns(StudentAns)
  
      }
  
    //  console.log("the submit timer is ", timer);
      let tt = totalTime + (60 - Number(timer));
     // console.log("the submit timer is ", tt);
      setTotalTime(tt);

      setDirect(1);
    }
  

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
    //  console.log("target value", target.value);
    }
  };

  useEffect(() => {
    if (redirect == 1) {
   //   console.log("the score is",score)
      const data ={
        ProductId:ProductId,
        UserId:UserId,
        moduleId:moduleId,
        scoreSecured:score,
        timeOfCompletion:totalTime
      }
      UpdateTestModuleData(data)
      .then((res)=>{
      //  console.log("the updated data res is", res)
      })
      let properties = {
        scoreSecured: score,
        totalTime: totalTime,
        totalQuestions: totalQuestions,
        correctedQAsetprop:StudentAns
      }
      ResultScreenProps(properties)
      
      // history.push({
      //   pathname: "/Results",
      //   state: {
      //     score: score,
      //     totalTime: totalTime,
      //     totalQuestions: totalQuestions,
      //     correctedQAset:StudentAns
      //   },
      // });
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
      
         if(timer-1==1){
          console.log("the there im printerd by come on fire ", option )
          onSubmit()
         }else{
          settimer(timer - 1);
         }

        } 
       
        else {
          let tt = totalTime + 60;
        // console.log("the auto submit timer is ", tt);
          setTotalTime(tt);
          setDirect(1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
         <MaximizeContent>
    <Box sx={{ width: "100%" , height:'100vh' , backgroundColor:'#02203c'}}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

<Grid xs={12}    md={12}>
  <Item style={{backgroundColor:'#02203c', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{width:'90%' , height:'80%' , backgroundColor:'#02203c'}}>
    <div style={{display:'flex', justifyContent:'space-between'}}>
<HeroTexttt>Centum</HeroTexttt>

            
<div>
  <HeroTextttl>Left</HeroTextttl>
  <MainHeadingl style={{ color: "white", fontSize:'10vhls' }}>{timer}</MainHeadingl>
</div>
</div>

    </div>

 

  </Item>
</Grid>
<hr />      
</Grid>
       <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      <Grid xs={12}    md={12}>
        <Item> 




      

{count <= Number(totalQuestions)
&&
<div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' ,display:'flex',justifyContent:'start',alignItems:'center', 	overflow:'auto',color:'black' , height:'100%', backgroundColor:'white', marginLeft:'1%' }}>  
{count + ")"}  <MathComponent    tex={question.ques} />

  </div>

}


        </Item>
      </Grid>
    </Grid>

    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
        xs={6}
        md={6}
        style={{
          fontSize: "2vh",

  overflow:'hidden'

        }}
      >
        <Item style={{backgroundColor:'red'  }}>
        <div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' ,display:'flex',justifyContent:'center',alignItems:'center', 	color:'black' , height:'100%', backgroundColor:'#02203c' }}>  
          <HeroTextttl style={{display:'flex'}} >
               <input
                   type="radio"
                  value="0"
                 checked={option == "0"}
                  onChange={handleChange}
                />{" "}
             <div style={{ marginLeft: "1%" , color:'white' }}> {count <= Number(totalQuestions) && <MathComponent tex={question.options[0]} /> }</div>{" "}
           </HeroTextttl> 
          </div>
   
        </Item>
      </Grid>
      <Grid
        xs={6}
        md={6}
        style={{
          fontSize: "2vh",

  overflow:'hidden'

        }}
      >
        <Item style={{backgroundColor:'red' , borderBottom:'none' }}>
        <div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' ,display:'flex',justifyContent:'center',alignItems:'center', 	color:'black' , height:'100%', backgroundColor:'#02203c' }}>  
          <HeroTextttl style={{display:'flex'}} >
               <input
                   type="radio"
                  value="1"
                 checked={option == "1"}
                  onChange={handleChange}
                />{" "}
             <div style={{ marginLeft: "1%" , color:'white' }}>  {count <= Number(totalQuestions) && <MathComponent tex={question.options[1]} />}</div>{" "}
           </HeroTextttl> 
          </div>
   
        </Item>
      </Grid>
      <Grid
        xs={6}
        md={6}
        style={{
          fontSize: "2vh",

  overflow:'hidden'

        }}
      >
        <Item style={{backgroundColor:'red'  }}>
        <div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' ,display:'flex',justifyContent:'center',alignItems:'center', 	color:'black' , height:'100%', backgroundColor:'#02203c' }}>  
          <HeroTextttl style={{display:'flex'}} >
               <input
                   type="radio"
                  value="2"
                 checked={option == "2"}
                  onChange={handleChange}
                />{" "}
             <div style={{ marginLeft: "1%" , color:'white' }}> {count <= Number(totalQuestions) &&  <MathComponent tex={question.options[2]} /> }</div>{" "}
           </HeroTextttl> 
          </div>
   
        </Item>
      </Grid>
      <Grid
        xs={6}
        md={6}
        style={{
          fontSize: "2vh",

  overflow:'hidden'

        }}
      >
        <Item >
        <div style={{	fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' ,display:'flex',justifyContent:'center',alignItems:'center', 	color:'black' , height:'100%', backgroundColor:'#02203c' }}>  
          <HeroTextttl style={{display:'flex', justifyContent:'space-between'}} >
               <input
                   type="radio"
                  value="3"
                 checked={option == "3"}
                  onChange={handleChange}
                />{" "}
             <div style={{ marginLeft: "1%" , color:'white' }}> {count <= Number(totalQuestions) &&  <MathComponent tex={question.options[3]} />}</div>{" "}
           </HeroTextttl> 
          </div>
   
        </Item>
      </Grid>
      {/* <Grid xs={6}    md={6}>
        <Item>2</Item>
      </Grid>
      <Grid xs={6}    md={6}>
        <Item>3</Item>
      </Grid>
      <Grid xs={6}    md={6}>
        <Item>4</Item>
      </Grid> */}
    </Grid>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

<Grid xs={12}    md={12}>
  <Item>
  {count < Number(totalQuestions) ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                 height:'100%',
                backgroundColor:'#02203c'
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
                backgroundColor:'#02203c',
                height:'100%'
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
            </div>
          )}
  </Item>
</Grid>
</Grid>
  </Box>
</MaximizeContent>
)

}

export default SampleTest;