import React, { useEffect } from 'react';
import { Container, Section } from '../../globalStyles';
import { Link } from 'react-router-dom';

import {
	FeatureText,
	FeatureTitle,
	FeatureWrapper,
	FeatureColumn,
	FeatureImageWrapper,
	FeatureName,
	FeatureTextWrapper,
} from './FeaturesStyles';
import { featuresData } from '../../data/FeaturesData';


const Features = (props) => {



	const initial = {
		y: 40,
		opacity: 0,
	};
	const animate = {
		y: 0,
		opacity: 1,
	};

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		console.log("the token is ", token)
	}, [])

	return (
		<Section smPadding="50px 10px" position="relative" inverse id="about" ref={props.myRef}>
			<Container>
				<FeatureTextWrapper>
					<FeatureTitle>Mathsky Modules</FeatureTitle>
				</FeatureTextWrapper>

				<FeatureWrapper>
					{featuresData.map((el, index) => {

						if (JSON.parse(localStorage.getItem("accessToken"))) {
							return (
								<Link to={el.link}>
									<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}


									>
										<FeatureImageWrapper className={el.imgClass}>
											{el.icon}
										</FeatureImageWrapper>
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>
								</Link>
							)
						} else {
							return (
								<Link to={"/signup"}>
									<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}


									>
										<FeatureImageWrapper className={el.imgClass}>
											{el.icon}
										</FeatureImageWrapper>
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>
								</Link>
							)


						}
					}


					)}
				</FeatureWrapper>
			</Container>
		</Section>
	);
};

export default Features;
