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
		<HeroSection>
			<HeroVideo />
			<Container>
				{type == '' ?
				 <MainHeading>Ready to take the Sample test?</MainHeading> : <MainHeading>Ready to take the Test Module {type} ?</MainHeading>}
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
