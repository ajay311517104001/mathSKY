import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import { getProductApi,deleteProductApi } from '../../ApiService'
import { useNavigate } from "react-router-dom";
import List from "../../components/table/Table";
import { useEffect, useState , } from "react";
import { Button } from "@mui/material";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

const Single = () => {
  let history = useNavigate();
const [datas,setData]=useState([])



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
  if(localStorage.getItem("Token")){
   
    ModulesApi()
   }else{
     history('/')
   }


},[])


const ModulesApi=()=>{
  getProductApi()
  .then((res)=>{
    console.log("the res is ",res)
    setData(res)
  })

}

const DeleteProduct = (id)=>{
  deleteProductApi(id)
  .then((res)=>{
    console.log("the res data is",res)
    if(res.message=="success"){
      ModulesApi()
    }
  })

}


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to="/products/new" style={{ textDecoration: "none" }}><div className="editButton">Add Product</div></Link>

          </div>

        </div>
        <div style={{   width: '100%', display: 'flex', flexWrap: 'wrap' , justifyContent:'start', }}>
          { datas.map((data,index)=>{
              return (
                <div style={{   boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '250px', width: '28%', overflow:'scroll',marginTop: '2%', marginLeft: '2%',borderRadius:10 , display:'flex', justifyContent:'center',alignItems:'center',position:'relative'}} key={index} >
          
                <div style={{ textAlign:'left' , width:'70%', marginLeft:'5%', lineHeight:2, }} >
                <h4 style={{   fontWeight: '500',
        color: '#7451f8'}}> Category: {data.category}</h4>
                <h4 style={{   fontWeight: '500'}}>Std Name:{data.StdName}</h4>

                <h4 style={{   fontWeight: '500'}}>Subject : {data.Subject}</h4>
                <h4 style={{   fontWeight: '500'}}>Module Name : {data.productName}</h4>
                <h4 style={{   fontWeight: '500'}}>Total test Modules:{data.totalTestModules}</h4>
                <h4 style={{   fontWeight: '500'}}>Price:{data.price}</h4>
 
                  </div>
                  
                  <div style={{position:'relative',height:'80%', display:'flex', flexDirection:'column'}}>
         
                    <Button onClick={()=>{
                    console.log("the im clicked")
                    history("/products/new",{state:data});

                  }} variant="outlined">edit</Button>
                     <Button onClick={()=>{
                       console.log("the id is", data._id)
                       if (window.confirm('Are you sure you want to delete?')){
                        DeleteProduct(data._id)
                       }
                 
                     }
                    //console.log("the im clicked")
                    //history("/products/new",{state:data});
                   

                  } style={{marginTop:'5%'}} variant="outlined" color="error">Bin</Button>
            
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

export default Single;
