import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import { deleteMcqApi, getAllMcqApi, getMcqListApi, getProductApi, getQasetApi, updateChapterWeightageApi} from '../../ApiService'
import { useNavigate ,useLocation } from "react-router-dom";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";

import { Button ,  Select, MenuItem ,FormControl} from "@mui/material";



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

const QAkeyin = () => {
  let history = useNavigate();
  const location = useLocation();

const [QAdata,setQAdata]=useState([])
const [chapterList,setChapterList]=useState([])
const [chapterName,setChapterName]=useState('')
const [data,setData]=useState({})
const [selected, setSelected] = useState('');
const [weightage,setWeightage]=useState('')

useEffect(()=>{
  if(localStorage.getItem("Token")){
    if(location.state._id){
      ModulesApi(location.state._id)
      console.log("the chapter datas are", location.state)
  }
  
  if(location.state.flag=="addnew"){
      getChapterNo(location.state.chapterName)
  }
   }else{
     history('/')
   }






},[])


const ModulesApi=(id)=>{
    console.log("the get all api id is",id)
    getAllMcqApi({id:id})
  .then((res)=>{
    console.log("the all mcq res is ",res)
     setData(res)
  })

}


const getChapterNo =(chapterNo)=>{
//   console.log("the id is", item.mcqList)
  let data={
     id:location.state._id,
     chapterNo:chapterNo
  }
  getMcqListApi(data)
  .then((res)=>{
    console.log("the mcqlist is ",res)
    setWeightage(res.weightage)
        setChapterList(res.mcqList)
   setChapterName(res.chapterNo)
  })


}

function handleChange(event) {
  setSelected(event.target.value);
  const data={
    id:location.state._id,
    chapterNo:chapterName,
    weightage:event.target.value

  }
  updateChapterWeightageApi(data)
  .then((res)=>{
    console.log("the weightage response is ",res)
    ModulesApi(location.state._id)
    getChapterNo(chapterName)
  })
  // getSubjectListApi(event.target.value)
  // .then((res)=>{
  //   console.log("the subject res is",res)
  //   let arr = []
  //   res.forEach(element => {
  //       arr.push(element)
  //   });
  //   console.log("the category list res is",  arr)
  //   setSubjectarr(arr)
  // }
  // )
}

  return (
    <div className="single">
    <Sidebar flag={"QAkeyin"} QAdata={data} getChapterNo={getChapterNo}/>  
      <div className="singleContainer">

        <div className="top">

          <div className="left" style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{marginLeft:'-10%'}}>
            <h3>{chapterName ? chapterName : " Select the chapter"}</h3>
            </div>
  

        {  chapterName && <Link to="/QAset/QAadd" state={{chapterName:chapterName, id: location.state._id}} style={{ textDecoration: "none" }}><div className="editButton">Add MCQ</div></Link> }
       <div style={{display:'flex',justifyContent:'space-between'}}>

          {chapterName &&
          <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>

          <h3>W:</h3>
          
          <FormControl size="small">
                  <Select value={weightage} onChange={handleChange}>
        {Array.from(new Array(10), (x,i) => i+1).map((value, index) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>
                  </FormControl>  
          </div>
}

<span>
<div style={{ marginRight:'5%', marginTop:'-1%'}}>
         <Button onClick={ ()=>history("/QAset")}>back</Button>
         </div>
</span>

        
       </div>
       
       
   

          </div>


        </div>
        <div style={{  height: '100%', width: '100%', display: 'flex', flexDirection:'column' }}>
          { chapterList.map((data,index)=>{
              return (
                <div style={{   boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '250px', width: '70%', overflow:'scroll',marginTop: '2%', marginLeft: '2%',borderRadius:10 , display:'flex', justifyContent:'start',alignItems:'center',position:'relative'}} key={index} >
          
          <div style={{ textAlign:'left' , width:'70%', marginLeft:'5%', lineHeight:2, }} >
                <h4 style={{   fontWeight: '500',
        color: '#7451f8'}}>{data.ques}</h4>
                 {
                     data.options.map((i,index)=>{
                         return(
                            <h4 style={{   fontWeight: '500'}}> option {index+1} : {i}</h4>

                         )
                     })
                 }
              
 
                  </div>
                  
        
                  <div style={{textAlign:'start', height:'85%' ,width:"25%"}} >
                    <Button onClick={()=>{
                    console.log("the im clicked")
                    history("/QAset/QAadd",{state:{ item:location.state , data :data , chapter: chapterName  }});

                  }} variant="outlined" >edit</Button>
                          <Button   style={{marginLeft:'2%'}} onClick={()=>{
                  //  console.log("the im clicked", data)
                    if(window.confirm('Are you sure you want to delete?')){
                        const adata ={
                            id:location.state._id,
                            quesId:data.quesId
                        }
                        deleteMcqApi(adata)
                        .then((res)=>{
                            console.log("the deletion res",res)
                            getChapterNo(chapterName)
                        }).catch((err)=>{
                            console.log("err in deletion",err)
                        })
                       }
                    

                  }} variant="outlined" color="error" >bin</Button>
                    </div>
              </div>

              )

          })
             
          }

        






        </div>  


      </div>
    </div>
  );
};

export default QAkeyin;
