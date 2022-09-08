import React, { useEffect, useState } from 'react';
import { Button, Container, Section , MainHeading } from '../../globalStyles';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { RiLock2Fill, RiLockUnlockFill } from "react-icons/ri";
import axios from "axios";
import {
	FeatureText,
	FeatureTitle,
	FeatureWrapper,
	FeatureColumn,
	FeatureImageWrapper,
	FeatureName,
	FeatureTextWrapper,
} from '../Products/FeaturesStyles';
import { featuresData } from '../../data/FeaturesData';
import Navbar from '../Navbar/Navbar';





const testmodules = [
	{
		name: 'Test Module 1',
		description: ' Free MCQ Test ',



	},
	{
		name: 'Test Module 2',
		description: '50 MCQ Test Modules',



	},
	{
		name: 'Test Module 3',
		description: 'Unlimited Custom Test Series',


	},

];


const Mcqtestseries = (props) => {
	const iconStyle = (Icon) => <Icon size="5rem" color="#0f0f0f" />;
	let history = useHistory();

	const initial = {
		y: 40,
		opacity: 0,
	};
	const animate = {
		y: 0,
		opacity: 1,
	};

	

	const [testmodules, setTestModules] = useState([])
	const [data, setData] = useState({})
	const [trigger, setTrigger] = useState(0)



	const accessApi = async () => {

		console.log("access api called")
		let userId = JSON.parse(localStorage.getItem("userId"))
		const data = await axios.post('http://localhost:8001/api/products/mcqtestseriesInfo', { id: userId });
		if (data) {
			console.log("this is the access api data", data.data.mts)
			setData(data.data)

		}
	}


	useEffect(() => {
		let testmodule = []
		// const token = localStorage.getItem("jwt");
		// console.log("the token is ", token)

		for (let i = 1; i < 51; i++) {
			testmodule.push({
				name: 'Test Module ' + i,
				description: 'Mcq Test Series',


			})
		}
		setTestModules(testmodule)
		accessApi();


	}, [trigger])

	function changeBackground(e) {
		e.target.style.color = 'white';
		e.target.style.backgroundColor = 'green'
	}
	function changeBackgroundleave(e) {
		e.target.style.color = 'white';
		e.target.style.backgroundColor = 'rgb(2, 32, 60)'
	}


	const initPayment = (data,userId) => {
		console.log("initpay data", data.amount)
		let { amount } = data
		const options = {
			key: process.env.KEY,

			amount: amount,
			currency: data.currency,
			name: "Mcq Test Series",
			description: "Test Transaction",

			order_id: data.id,
			handler: async (response) => {

				try {
				
						const verifyUrl = "http://localhost:8001/api/orders/verify";
						const { data } = await axios.post(verifyUrl, { response, id: userId, amount: amount });

					console.log(data);
					if (trigger == 0) {
						setTrigger(1)
					} else {
						setTrigger(0)
					}
					
			
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};


	const handlePayment = async () => {
		try {
			let userId = JSON.parse(localStorage.getItem("userId"))
			console.log("the user id is", userId)
			if(userId){
			const orderUrl = "http://localhost:8001/api/orders/createOrder";
			const { data } = await axios.post(orderUrl, { amount: '200' });
			console.log(data);
			initPayment(data.data, userId);
		}else{
			localStorage.clear();
			history.push('/')
		}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
	<Navbar/>
			<div style={{ width: '100%', height: '50vh', backgroundColor: "#02203c" , display:'flex', justifyContent:'center', alignItems:'center' , flexDirection:'column'}}>
			


				<MainHeading >MCQ TEST SERIES</MainHeading>

{ data.mts == false && <center ><Button onMouseOver={changeBackground} onMouseLeave={changeBackgroundleave} onClick={() => handlePayment()}>BUY</Button></center>}



						</div>
			<Section position="relative" inverse id="about" ref={props.myRef} style={{ padding: 0 }}>
				<Container  >



					<FeatureWrapper>
						{testmodules.map((el, index) => {

							if (data.mts)
								return (

									<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}
										onClick={() => {
											console.log("clicked", index + 1)
											history.push({ pathname: "McqTestseriesModule", state: { testmodule: (index + 1).toString() } })
										}}

									>

										{iconStyle(RiLockUnlockFill)}
										{/* <FeatureImageWrapper className={el.imgClass}>
											{el.icon}
										</FeatureImageWrapper> */}
										<br />
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>

								)
							else {
							

	
	
										

	
	
							
									return(
										<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}


									>

										{iconStyle(RiLock2Fill)}
										{/* <FeatureImageWrapper className={el.imgClass}>
	{el.icon}
</FeatureImageWrapper> */}
										<br />
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>
									)
								}
								

							
						}



						)}
					</FeatureWrapper>
				</Container>
			</Section>

		</div>


	);
};

export default Mcqtestseries;
