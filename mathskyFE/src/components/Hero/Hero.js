import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';

const Hero = (props) => {
	return (
		<HeroSection>
			<HeroVideo />
			<Container>
				<MainHeading>Don't worry about your Board exam. we got you covered</MainHeading>
				<HeroText>
					We provide the best E-Learning platform to level up your Exam score
				</HeroText>
				<ButtonWrapper>
					{/* <Link to="signup"> */}
						<Button onClick={props.executeScroll}>Buy Now</Button>
					{/* </Link> */}
					
					{/* <HeroButton>Find More</HeroButton> */}
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
};

export default Hero;
