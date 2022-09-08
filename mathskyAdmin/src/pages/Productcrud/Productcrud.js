import "./new.scss";
import { useLocation, /* other hooks */ } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addProductApi, getCategoryListApi, getSubjectListApi, updateProductApi } from '../../ApiService'
import { Select, MenuItem ,FormControl} from "@mui/material";



const New = () => {
  let history = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState("");
  const [price, setPrice] = useState('')
  const [subject, setSubject] = useState('')
  const [totalModules, setTotalModules] = useState('')
  const [categoryarr, setCategoryarr] = useState([]);
  const [selected, setSelected] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [category, setCategory] = useState('')
  const [Modulename, setModuleName] = useState('')
  const [standardText, setStandardText] = useState('')
  const [subjectArr, setSubjectarr] = useState([]);


  useEffect(() => {


    if (localStorage.getItem("Token")) {
      if (location.state) {
        setPrice(location.state.price)
        setSubject(location.state.Subject)
        setTotalModules(location.state.totalTestModules)
        setStandardText(location.state.StdName)
        setCategory(location.state.category)

        console.log("the id name is ", location.state._id)
        setModuleName(location.state.productName)

      }
      getCategoryListApi()
      .then((res)=>{
        
       let arr = []
        res.forEach(element => {
            arr.push(element)
        });
        console.log("the category list res is",  arr)
        setCategoryarr(arr)
      })

    } else {
      history('/')
    }


  }, [])

  const onUpdate = () => {
    if (price && subject && totalModules && category && Modulename && standardText) {
      let data = {
        id: location.state._id,
        category: category,
        Subject: subject,
        productName: Modulename,
        totalModules: totalModules,
        standardText: standardText,
        price: price
      }
      updateProductApi(data)
        .then((res) => {
          console.log("the res is ", res)
          if (res.message) {
            history("/products");
          }

          // setData(res)
        })

    }
    console.log("the price is ", price)
    console.log("the subject is ", subject)
    // console.log("the totalChapters is ", totalChapters)
    // console.log("the standard is ", standard)
  }

  const onSave = () => {
    if (price && selectedSub && totalModules && selected && Modulename && standardText) {
      let data = {
        category: selected,
        Subject: selectedSub,
        productName: Modulename,
        totalModules: totalModules,
        standardText: standardText,
        price: price
      }
      addProductApi(data)
        .then((res) => {
          console.log("the res is ", res)
          history("/products");
          // setData(res)
        })

    }
    console.log("the price is ", price)
    console.log("the subject is ", subject)
    // console.log("the totalChapters is ", totalChapters)
    // console.log("the standard is ", standard)
  }

  function handleChange(event) {
    setSelected(event.target.value);
    getSubjectListApi(event.target.value)
    .then((res)=>{
      console.log("the subject res is",res)
      let arr = []
      res.forEach(element => {
          arr.push(element)
      });
      console.log("the category list res is",  arr)
      setSubjectarr(arr)
    })
  }

  function handlesubChange(event){
    setSelectedSub(event.target.value)
  }
  const fun = (item)=>{
    setCategoryarr(item)
  }

  if (location.state) {

    //const { std ,totalChapters,subject} =location.state
    console.log(" the location is", location.state)
    return (
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
                  <label> standard (Roman number)</label>
                  <input type='text' value={category} onChange={(e) => {
                    setCategory(e.target.value)

                  }} />
                </div>
                <div className="formInput" >
                  <label> subject</label>
                  <input type='text' value={subject} onChange={(e) => {
                    setSubject(e.target.value)

                  }} />
                </div>
                <div className="formInput"  >
                  <label> Total Chapters</label>
                  <input type='number' value={totalModules} onChange={(e) => {
                    setTotalModules(e.target.value)

                  }} />
                </div>
                <div className="formInput"  >
                  <label> price</label>
                  <input type='number' value={price} onChange={(e) => {
                    setPrice(e.target.value)

                  }} />
                </div>
                <div className="formInput"  >
                  <label> Module Name</label>
                  <input type='text' value={Modulename} onChange={(e) => {
                    setModuleName(e.target.value)

                  }} />
                </div>

                <div className="formInput" >
                  <label> standard </label>
                  <input type='text' value={standardText} onChange={(e) => {
                    setStandardText(e.target.value)

                  }} />
                </div>



              </form>
              <br />
              <br />
              <center> <button style={{ paddingInline: 30, paddingTop: 10, paddingBottom: 10 }} onClick={onUpdate}>Update</button></center>
            </div>
          </div>
        </div>
      </div>

    )
  } else {
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
                  {/* <input type='text'   onChange={(e)=>{
                    setCategory(e.target.value)

                  } } /> */}
                  <FormControl>
                  <Select value={selected} onChange={handleChange}>
        {categoryarr.map((value, index) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>
                  </FormControl>
                </div>
                <div className="formInput" >
                  <label> subject</label>
                  {/* <input type='text'  onChange={(e)=>{
                    setSubject(e.target.value)

                  } }/> */}
               
               <FormControl>
                  <Select value={selectedSub} onChange={handlesubChange}>
        {subjectArr.map((value, index) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>
      </FormControl>

                </div>
                <div className="formInput"  >
                  <label> Total Test Modules</label>
                  <input type='number' onChange={(e) => {
                    setTotalModules(e.target.value)

                  }} />
                </div>
                <div className="formInput"  >
                  <label> price</label>
                  <input type='number' onChange={(e) => {
                    setPrice(e.target.value)

                  }} />
                </div>
                <div className="formInput"  >
                  <label> Product Name</label>
                  <input type='text' onChange={(e) => {
                    setModuleName(e.target.value)

                  }} />
                </div>

                <div className="formInput" >
                  <label> standard </label>
                  <input type='text' onChange={(e) => {
                    setStandardText(e.target.value)

                  }} />
                </div>


              </form>
              <br />
              <br />
              <center> <button style={{ paddingInline: 30, paddingTop: 10, paddingBottom: 10 }} onClick={onSave}>Save</button></center>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default New;
