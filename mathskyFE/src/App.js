import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import SignUp from './pages/SignupPage';
import SignIn from './pages/SigninPage';
import Pricing from './pages/PricingPage';
import Footer from './components/Footer/Footer';
import SampleTest from './components/Pricing/SampleTest';
import Mcqtestseries from './components/Mcqtestseries/Mcqtestseries';
import Mcqtestpro from './components/Content/Mcqtestpro/Mcqtestpro';
import Navbar from './components/Navbar/Navbar';


function App() {
	return (
		<Router>
			<GlobalStyle />
	
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/sampletest" exact component={Pricing} />
				<Route path="/sampletest_" exact component={SampleTest} />
				<Route path="/mcqtestseries" exact component={Mcqtestseries} />
				<Route path="/mcqtestpro" exact component={Mcqtestpro} />
				<Route path="/McqTestseriesModule" exact  component={Pricing}  />


			</Switch>
			{/* <Footer /> */}
		</Router>
	);
}

export default App;
