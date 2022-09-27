import styled from 'styled-components';
import { Button } from '../../globalStyles';

export const HeroSection = styled.section`
	height: 100vh;
	background-position: center;
	background-size: cover;
	padding-top: clamp(70px, 25vh, 220px);
	box-shadow: inset 0 0 0 1000px rgba (0, 0, 0, 0.2);
`;

export const HeroVideo = styled.video`
	object-fit: cover;
	width: 100%;
	height: 100%;
	background: #02203c;
	top: 0;
	position: absolute;
	z-index: -1;
`;

export const HeroText = styled.p`
	margin-bottom: 35px;
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);
	line-height: 24px;
	text-align: center;
	letter-spacing: 2px;

	color: #fff;
`;
export const HeroTextt = styled.p`
	margin-bottom: 35px;
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);
	line-height: 24px;
	text-align: left;
	letter-spacing: 2px;
	margin-left:5%;
	color: #fff;
`;
export const HeroTexttt = styled.p`
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);
	line-height: 30px;
	text-align: center;
	letter-spacing: 2px;

	color: #fff;
`;
export const HeroTextttl = styled.p`
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);

	text-align: center;
	letter-spacing: 2px;

	color: #fff;
`;
export const HeroTexttl = styled.div`
	margin-bottom: 35px;
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);
	line-height: 24px;
	text-align: left;
	letter-spacing: 2px;
	margin-left:5%;
	color: #fff;
`;

export const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-flow: wrap;
	gap: 0.5rem;
`;

export const HeroButton = styled(Button)`
	color: black;

	&:before {
		background: #fff;
		height: 500%;
	}

	&:hover:before {
		height: 0%;
	}

	&:hover {
		color: white;
	}
`;