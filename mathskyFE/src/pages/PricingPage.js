import React from 'react';
import Pricing from '../components/Pricing/Pricing';
import { useLocation } from "react-router-dom";
const PricingPage = () => {
	const location = useLocation();
	console.log("the props is ",typeof(location.state.testmodule))
	return <Pricing testtype={location.state.testmodule} />;
};

export default PricingPage;
