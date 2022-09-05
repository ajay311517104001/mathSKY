import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


const Sidebar = (props) => {
  const { dispatch } = useContext(DarkModeContext);
  if(props.flag){
    console.log("the chapters are----",props.QAdata.chapters)
    return(
      <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MathSKY</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Chapters</p>
          
   
       {  props.QAdata.chapters && props.QAdata.chapters.map((item,index)=>{
         return(
         <div onClick={()=> props.getChapterNo(item.chapterNo)} key={index}>
            
            <li  >
            <CreditCardIcon className="icon" />
          <span  className="titlee">{item.chapterNo}</span>
        </li>

         </div>
       


         )
       
       })}
    
           
    
  
       
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
    )

  }else{
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">MathSKY</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Products</span>
              </li>
            </Link>
            <Link to="/QAset" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>QA set</span>
              </li>
            </Link>
  
  
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
      
    
            <p className="title">USER</p>
         
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    );
  }

};

export default Sidebar;
