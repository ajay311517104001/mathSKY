import "./new.scss";
import { useLocation, /* other hooks */ } from 'react-router-dom'; 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {addQasetApi} from '../../ApiService'

import { useNavigate } from "react-router-dom";



const QAcrud = () => {
  let history = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState("");

  const [subject,setSubject] = useState('')
  const [totalChapters,setTotalChapters] = useState('')
  const [standard,setStandard] = useState('')
  const [standardText,setStandardText]=useState('')


  useEffect(()=>{
    if(location.state){

      setSubject(location.state.subject)
      setTotalChapters(location.state.totalChapters)
      setStandard(location.state.std)
      
    }
 

  },[])

  const fun = ()=>{

    console.log("the subject is ", subject)
    console.log("the totalChapters is ", totalChapters)
    console.log("the standard is ", standard)
  }

  const onSave = ()=>{
    if(subject &&  totalChapters && standard  && standardText){
      let data ={
        category:  standard,
     Subject:subject,

    totalChapters: totalChapters,
    StdName:standardText,

      }
      addQasetApi(data)
      .then((res)=>{
        console.log("the res is ",res)
        history("/QAset/QAkeyin");
       // setData(res)
      })

    }

    console.log("the subject is ", subject)
   // console.log("the totalChapters is ", totalChapters)
   // console.log("the standard is ", standard)
  }
 if(location.state){
   
  //const { std ,totalChapters,subject} =location.state
   console.log(" the location is", location.state)
   return(
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">

      </div>
      <div className="bottom">
    <div className="right">
            <form>
           


                <div className="formInput" >
                  <label> Category (Roman number)</label>
                  <input type='text' value={standard}  onChange={(e)=>{
                    setStandard(e.target.value)

                  } } />
                  </div>
                  <div className="formInput" >
                  <label> subject</label>
                  <input type='text' value={subject} onChange={(e)=>{
                    setSubject(e.target.value)

                  } }/>
                  </div>
                  <div className="formInput"  >
                  <label> Total Chapters</label>
                  <input type='number' value={totalChapters} onChange={(e)=>{
                    setTotalChapters(e.target.value)

                  } }/>
                  </div>
            

                <div className="formInput" >
                  <label> standard </label>
                  <input type='text' value={standardText}  onChange={(e)=>{
                    setStandard(e.target.value)

                  } } />
                  </div>


           
            </form>
            <br/>
            <br/>
          <center> <button style={{   paddingInline:30 , paddingTop:10,paddingBottom:10}} onClick={fun}>Send</button></center> 
          </div>
          </div>
        </div>
      </div>
    
   )
 }else{
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">

        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
           

            <div className="formInput" >
                  <label> Category (Roman number)</label>
                  <input type='text'   onChange={(e)=>{
                    setStandard(e.target.value)

                  } } />
                  </div>
                  <div className="formInput" >
                  <label> subject</label>
                  <input type='text'  onChange={(e)=>{
                    setSubject(e.target.value)

                  } }/>
                  </div>
                  <div className="formInput"  >
                  <label> Total Chapters</label>
                  <input type='number'  onChange={(e)=>{
                    setTotalChapters(e.target.value)

                  } }/>
                  </div>
               

                <div className="formInput" >
                  <label> standard </label>
                  <input type='text' onChange={(e)=>{
                    setStandardText(e.target.value)

                  } } />
                  </div>

           
            </form>
            <br/>
            <br/>
          <center> <button style={{   paddingInline:30 , paddingTop:10,paddingBottom:10}} onClick={onSave}>save</button></center> 
          </div>
        </div>
      </div>
    </div>
  );
 }
 
};

export default QAcrud;
