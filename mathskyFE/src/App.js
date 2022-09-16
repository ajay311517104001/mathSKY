import React, { useEffect, useState } from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route ,Redirect } from 'react-router-dom';

//Pages
import max from './customhook/max'
import Home from './pages/Home';
import SignUp from './pages/SignupPage';
import SignIn from './pages/SigninPage';
import Pricing from './pages/PricingPage';
import Footer from './components/Footer/Footer';
import SampleTest from './components/Pricing/SampleTest';
import Mcqtestseries from './components/Mcqtestseries/Mcqtestseries';
import Mcqtestpro from './components/Content/Mcqtestpro/Mcqtestpro';
import Navbar from './components/Navbar/Navbar';
import { useHistory } from "react-router-dom";
import Results from './pages/Results';
import TestScreen from './components/Pricing/TestScreen';



const ProtectedRoute =(props)=> {


	const {  path , component } = props

	 if(localStorage.getItem("accessToken")){
		return (
			
			<Route path={path} exact component={component} />
		  )
	 }else{
		 return(
			<Redirect to='/' />
		 )
	 } 

  }

const UnProtectedRoute =(props)=> {
	let history = useHistory();

	const {  path , component } = props

	 if(localStorage.getItem("accessToken")){
		history.goBack()

	 }else{
		 return(
			<Route path={path} exact component={component} />
		 )
	 } 

  }

function App() {
 
//    const [dynamicPath,setDynamicPath]=useState('')

// 	const onDynamicPath =(path)=>{
// 		console.log("the path is",path)
//        setDynamicPath(path)
// 	}
	

	const NotFoundRedirect = () => <Redirect to='/' />
	return (
		<Router>
			<GlobalStyle />
				   <Switch>
				   <Route path="/" exact  component={Home} />
				   {/* <Route path="/max" exact  component={max} /> */}
				   <UnProtectedRoute path="/signup" exact component={SignUp} />
				   <UnProtectedRoute path="/signin" exact component={SignIn} />
	


					<ProtectedRoute path={"/testModules/:id"}  component={Mcqtestseries} />
					<ProtectedRoute path={"/TestModule/:id/ModuleInfo/:modulesName"}  component={TestScreen}  />
					<ProtectedRoute path={"/Results"}  component={Results}  />
				  	<Route path='*' component={NotFoundRedirect} />
			 </Switch>
		</Router>
	);
}

export default App;
