import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, TextWrapper, MainHeading } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';

import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from '../Hero/HeroStyles';

import {
	PricingSection,
	PricingWrapper,
	PricingContainer,
	PricingCardInfo,
	PricingCardPlan,
	PricingCardCost,
	PricingCardFeatures,
	PricingCardText,
	PricingCardFeature,
	PricingCard,
} from './PricingStyles';
import { pricingData } from '../../data/PricingData';


function Pricing(props) {
	console.log("the pricing data", props.testtype)

	const [type, setType] = useState('')

	useEffect(() => {
		setType(props.testtype)

	}, [])
	return (
		// 		<IconContext.Provider value={{ color: '#a9b3c1', size: '1rem' }}>
		// 			<PricingSection id="pricing">
		// 				<PricingWrapper>
		// 					<Heading>Ready to take the Sample test?</Heading>
		// 					<Heading style={{marginTop:'2%'}}>MATHS </Heading>
		// 					<div

		// 				    style={{color:'white', marginTop:'4%'}}
		// 					>
		// 						This test module contains 15 MCQ questions from 10th Samacheer Kalvi syllabus 
		// 					</div>

		// 				<ButtonWrapper>




		// <Button style={{color:'white', marginTop:'10%'}} >START</Button>
		// </ButtonWrapper>



		// 				</PricingWrapper>
		// 			</PricingSection>
		// 		</IconContext.Provider>
		<HeroSection>
			<HeroVideo />
			<Container>
				{type == '' ? <MainHeading>Ready to take the Sample test?</MainHeading> : <MainHeading>Ready to take the Test Module {type} ?</MainHeading>}
				<HeroText>
					This test module contains 14 MCQ questions from 10th Samacheer Kalvi syllabus
				</HeroText>
				<ButtonWrapper>

					{type == '' ?

						<Link to="sampletest_">
							<Button>START</Button>
						</Link>

						:

							<Button>START</Button>



					}

					{/* <HeroButton>Find More</HeroButton> */}
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
}
export default Pricing;
