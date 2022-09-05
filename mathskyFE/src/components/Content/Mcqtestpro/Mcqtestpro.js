import React, { useEffect ,useState} from 'react';
import { Container, Section } from '../../../globalStyles';
import { Link } from 'react-router-dom';

import {
	FeatureText,
	FeatureTitle,
	FeatureWrapper,
	FeatureColumn,
	FeatureImageWrapper,
	FeatureName,
	FeatureTextWrapper,
} from '../../Features/FeaturesStyles';




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



const Mcqtestpro = (props) => {



	const initial = {
		y: 40,
		opacity: 0,
	};
	const animate = {
		y: 0,
		opacity: 1,
	};


    const [testmodules,setTestModules]=useState([])
	useEffect(() => {
        let testmodule=[]
		const token = localStorage.getItem("jwt");
		console.log("the token is ", token)

        for (let i = 1; i < 101; i++) {
           testmodule.push({
            name: 'Test Module ' + i,
            description: 'Unlimited Custom Test Series',
    
    
        })
          }
          setTestModules(testmodule)
	}, [])

	return (
        <div>

            <div style={{width:'100%', height:'50vh', backgroundColor:"#02203c"}}>
                <p>header</p>
            </div>
            	<Section  position="relative" inverse id="about" ref={props.myRef} style={{ padding:0}}>
			<Container  >
				

				<FeatureWrapper>
					{testmodules.map((el, index) => {

					
							return (

									<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}


									>
										{/* <FeatureImageWrapper className={el.imgClass}>
											{el.icon}
										</FeatureImageWrapper> */}
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>

							)
						}
					


					)}
				</FeatureWrapper>
			</Container>
		</Section>

        </div>

	
	);
};

export default Mcqtestpro;
