import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import { getProductApi, getQasetApi} from '../../ApiService'
import { useNavigate } from "react-router-dom";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const QAset = () => {
  let history = useNavigate();
const [QAdata,setQAData]=useState([])



useEffect(()=>{
  // const arr =[]
  // for(let i=0; i<15 ; i++){
  //   arr.push({
  //     'subject':'Maths',
  //     'price':'200',
  //     'count':i+1
  //   })
  // }
  // setData(arr)
  ModulesApi()

},[])


const ModulesApi=()=>{
  getQasetApi()
  .then((res)=>{
    console.log("the res is ",res)
    setQAData(res)
  })

}

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <Link to="/QAset/new"  style={{ textDecoration: "none" }}><div className="editButton">Add Q&A set</div></Link>

          </div>

        </div>
        <div style={{  height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' , justifyContent:'start', }}>
          { QAdata.map((data,index)=>{
              return (
                <div style={{   boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '250px', width: '28%', overflow:'scroll',marginTop: '2%', marginLeft: '2%',borderRadius:10 , display:'flex', justifyContent:'center',alignItems:'center',position:'relative'}} key={index} >
          
          <div style={{ textAlign:'left' , width:'70%', marginLeft:'5%', lineHeight:2, }} >
                <h4 style={{   fontWeight: '500',
        color: '#7451f8'}}> category: {data.category}</h4>
                <h4 style={{   fontWeight: '500'}}>Subject : {data.Subject}</h4>
                <h4 style={{   fontWeight: '500'}}>Total Chapters : {data.totalChapters}</h4>
                <h4 style={{   fontWeight: '500'}}>Std Name:{data.StdName}</h4>
 
                  </div>
                  
        
                  <div style={{textAlign:'start', height:'85%'}} >
                    <Button onClick={()=>{
                   console.log("the im clickeddty",data)

                    history("/QAset/QAkeyin",{state:data});

                  }} variant="outlined">edit</Button>
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

export default QAset;
