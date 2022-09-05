import React,{ useEffect, useState }  from 'react';
import { Button,MainHeadingg } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroTextt,HeroTexttt, ButtonWrapper, HeroButton } from '../Hero/HeroStyles';

let questions = [
    {
      ques: "1. A = {a, b, p}, B = {2, 3}, C = {p, q, r, 5} then n[(A ∪ C) × B] is ",
      options: ["8", "20", "12", "16"],
      correctIndex: 2
    },
    {
      ques: "2. If a, b, c are in G.P., then 𝑎−𝑏𝑏−𝑐 is equal to ",
      options: ["West Indies", "Australia", "New Zealand", "India"],
      correctIndex: 1
    },
    {
      ques:
        "3. If k + 2, 4k – 6, 3k – 2 are the 3 consecutive terms of an A.P, then the value of k is",
      options: ["2", "3", "4", "5"],
      correctIndex: 1
    },
    {
      ques:
        "4. If (x – 6) is the HCF of x2 – 2x – 24 and x2 – kx – 6 then the value of k is",
      options: [
        "The ratio of the length to the height of the flag shall be 3:2",
        "The ratio of the length to the width of the flag shall be 3:2",
        "The ratio of the length to the height of the flag shall be 2:3",
        "Both (a) and (b)"
      ],
      correctIndex: 3
    },
    {
      ques: "5. If A is a 2 × 3 matrix and B is a 3 × 4 matrix, how many columns does AB have",
      options: [
        "3",
        "4",
        "2",
        "5"
      ],
      correctIndex: 1
    },
    {
        ques: "6. In a ∆ABC, AD is the bisector of ∠BAC. If AB = 8 cm, BD = 6 cm and DC = 3 cm. The length of the side AC is",
        options: [
          "6 cm",
          "4 cm",
          "3 cm",
          "8 cm"
        ],
        correctIndex: 1
      }
      ,
      {
        ques: "7. (2, 1) is the point of intersection of two lines.",
        options: [
          "x – y – 3 = 0; 3x – y – 7 = 0",
          "x + y = 3; 3x + y = 7",
          "3x + y = 3; x + y = 7",
          "x + 3y – 3 = 0; x – y – 1 = 0"
        ],
        correctIndex: 1
      }
      ,
      {
        ques: "8. If the ratio of the height of a tower and the length of its shadow is √3 : 1 , then the angle of elevation of the sun has measure ",
        options: [
          "45°",
          "30°",
          "90°",
          "60°"
        ],
        correctIndex: 3
      }
      ,{
        ques: "9. A spherical ball of radius r1 units is melted to make 8 new identical balls each of radius r2 units. Then r1 : r2 is",
        options: [
          "2:1",
          "1:2",
          "4:1",
          "1:4"
        ],
        correctIndex: 0
      }
      ,
      {
        ques: "10. The standard deviation of a data is 3. If each value is multiplied by 5 then the new variance is",
        options: [
          "3",
          "15",
          "5",
          "225"
        ],
        correctIndex: 3
      }
      ,
      {
        ques: "11. A page is selected at random from a book. The probability that the digit at units place of the page number chosen is less than 7 is ",
        options: [
          "3",
          "15",
          "5",
          "225"
        ],
        correctIndex: 3
      }
      ,{
      ques: "12. The range of the relation R = {(x, x3)/x} is a prime number less than 13} is",
      options: [
        "3",
        "15",
        "5",
        "225"
      ],
      correctIndex: 3
    }
    ,{ques: "13. If 1 + 2 + 3 + …. + n = k then 13 + 23 + 33 + ……… n3 is equal to",
    options: [
      "3",
      "15",
      "5",
      "225"
    ],
    correctIndex: 3
  }
  ,
  {ques: "14. Two dice are thrown simultaneously. The probability of getting a doublet is",
    options: [
      "3",
      "15",
      "5",
      "225"
    ],
    correctIndex: 3
  }
  ,
  ];

const SampleTest = () => {


const [question,setQuestion]=useState(questions[0]);
const [result,setResult]=useState(false);
const [option, setOption] = useState();
const [count,setCount]=useState(1);
const [timer,settimer]=useState(60);
const [score,setScore]=useState(0)

const fun =()=>{
   if(questions[count-1].correctIndex == option) {
       setScore(score+1)
     
   }
   setOption('')
   console.log(score)
    if(count<=13){
        setCount(count+1)
        setQuestion(questions[count])
        settimer(60)
        
    }

    
}
useEffect(()=>{
   
  const interval=  setInterval(fun, 60000);
   return()=>clearInterval(interval)
},[question])

const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setOption(target.value);
      console.log("target value",target.value)
    }
  };

useEffect(()=>{
   
    const interval=  setInterval(()=>{
        if(count<=14){
            if(timer>0){
                settimer(timer-1)
            }
  }
    }, 1000);
     return()=>clearInterval(interval)
  },[timer])


    return (
        <>
      {result  ?   
   

<div>
{score}
</div>
    :  
    <div className="questions" style={{backgroundColor:'#02203c', height:'100vh'}}>
    
    <div style={{ display:'flex' , justifyContent:'space-between', paddingTop:'2%' , paddingBottom:'.5%', paddingRight:'10%'}}>
      <div style={{marginLeft:'5%'}}>
      <br/>
      <HeroTexttt>MATHSKY</HeroTexttt>
  

      </div>
        <div >
        <HeroTexttt>Left</HeroTexttt>
        <MainHeadingg style={{color:'white'}}>{timer}</MainHeadingg> 
        </div>
  
    </div>

    <hr/>
<div style={{ paddingTop:'2%', paddingBottom:'2%'}}>

<HeroTextt> {question.ques}	</HeroTextt>
<ul style={{listStyle:'none'}}>
    
<HeroTextt style={{display:'flex'}}><input type="radio" value="0" checked={option == '0'} onChange={handleChange} />  <li style={{marginLeft:'1%'}}>{question.options[0]}</li>  </HeroTextt> 
<HeroTextt style={{display:'flex'}}><input type="radio" value="1" checked={option == '1'}  onChange={handleChange}/>  <li style={{marginLeft:'1%'}}>{question.options[1]}</li>  </HeroTextt> 
<HeroTextt style={{display:'flex'}}><input type="radio" value="2" checked={option == '2'}  onChange={handleChange}/>  <li style={{marginLeft:'1%'}}>{question.options[2]}</li>  </HeroTextt> 
<HeroTextt style={{display:'flex'}}><input type="radio" value="3" checked={option == '3'} onChange={handleChange} />  <li style={{marginLeft:'1%'}}>{question.options[3]}</li>  </HeroTextt> 
</ul>
</div>
<hr/>

{count<14 ? 
<div style={{display:'flex', justifyContent:'center' , alignItems:'center',marginTop:'7%'}}>
<Button style={{color:'white'}} onClick={()=>{
   fun()
}}> next</Button>
</div>
: 
<div style={{display:'flex', justifyContent:'center' , alignItems:'center',marginTop:'7%'}}>
<Button style={{color:'white'}} onClick={()=>{

   setResult(true)
   if(questions[count-1].correctIndex == option) {
    setScore(score+1)
  
}
}}>Submit</Button>
</div>

}
</div>
   
        }
      
     


     
      </>
    );
}

export default SampleTest;