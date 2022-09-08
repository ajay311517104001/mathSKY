import React, { useEffect, useState } from 'react';
import { Container, Section } from '../../globalStyles';
import { Link } from 'react-router-dom';
import { BsStarHalf } from 'react-icons/bs';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CgEnter } from 'react-icons/cg';
import { getCategoryListApi, getProductsApi, getSubjectListApi } from '../../ApiService';

const Products = (props) => {

	const [category, setCategory] = useState('');
	const [subject,setSubject]=useState('');
    const [stdlist,setStdlist]=useState([]);
	const [subjectList,setSubjectList]=useState([])
	const [products,setProducts]=useState([])

	const initial = {
		y: 40,
		opacity: 0,
	};
	const animate = {
		y: 0,
		opacity: 1,
	};


	const getProducts =(data)=>{
		getProductsApi(data)
		.then((res)=>{
			if(res.length>0){
				console.log("the products are",res)
				setProducts(res)

			}
			
		})
	}
	const getSubjectList =(id)=>{
		getSubjectListApi(id)
		.then((res)=>{
			console.log("the res for the res mah be",res)
			if(res.length>0){

				setSubjectList(res)
				setSubject(res[0].Subject)
				const data ={
					category:id,
					Subject:res[0].Subject
				}
				getProducts(data)


			}
		})
	}

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		console.log("the token is ", token)
		getCategoryListApi()
		.then((res)=>{
			if(res.length>0){
			setStdlist(res)
			setCategory(res[0].StdName);
			getSubjectList(res[0].category)

		}
	
		})

	}, [])

	const handleCategoryChange = (e) => {

		 setCategory(e.target.value);
		// getSubjectList(e.target.value)

	  };
	
	  const handleSubjectChange = (e) => {

		setSubject(e.target.value);
	   // getSubjectList(e.target.value)

	 };
   
	 const handleCategoryApiCall = (e) => {
		getSubjectList(e.category)
		 // setCategory(e.target.value);
		// getSubjectList(e.target.value)
 
	  };

	const handleSubjectApiCall = (e) => {
	    console.log("kajdsnfkjasdf",e)
		const data ={
			category:e.category,
			Subject:e.Subject
		}
		getProducts(data)
		// setCategory(e.target.value);
	   // getSubjectList(e.target.value)

	 };

	return (
		<Section smPadding="50px 10px" position="relative" inverse id="about" ref={props.myRef}>
			<Container>
				<FeatureTextWrapper>
					<FeatureTitle>Mathsky Modules</FeatureTitle>
				</FeatureTextWrapper>


				<center>

					<ToggleButtonGroup
						color="standard"
						value={category}
						exclusive
						 onChange={handleCategoryChange}
						aria-label="Platform"
					>
						{ stdlist.length>0 && stdlist.map((item,index)=>{
							return(<ToggleButton value={item.StdName} onClick={()=>handleCategoryApiCall(item)} key={index}>{item.StdName}</ToggleButton>)
	
						})}
		


					</ToggleButtonGroup>
					
				</center>

             <br/>
				<center>

					<ToggleButtonGroup
						color="standard"
						value={subject}
						exclusive
						   onChange={handleSubjectChange}
						aria-label="Platform"
					>
						{ subjectList.length>0 && subjectList.map((item,index)=>{
							return(<ToggleButton value={item.Subject} onClick={()=>handleSubjectApiCall(item)} key={index}>{item.Subject}</ToggleButton>)
	
						})}
					</ToggleButtonGroup>
				</center>
				<FeatureWrapper>
					{products.map((el, index) => {

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
										<BsStarHalf size="3rem" color="#0f0f0f" />
										</FeatureImageWrapper>
										<FeatureName>{el.name}</FeatureName>
										<FeatureText>{el.description}</FeatureText>
									</FeatureColumn>
								</Link>
							)
						} else {
							return (
								// <Link to={"/signup"}>
								<div style={{cursor:'pointer'}}>
									<FeatureColumn
										initial={initial}
										animate={animate}
										transition={{ duration: 0.5 + index * 0.1 }}
										key={index}
										


									>
										<FeatureName>{el.StdName}</FeatureName>
										<FeatureImageWrapper className={el.imgClass} style={{marginTop:'3%'}}>
										<BsStarHalf size="2rem" color="#0f0f0f" />
										</FeatureImageWrapper>
										<FeatureName>{el.productName}</FeatureName>
										<FeatureText>{el.totalTestModules} MCQ Test Modules</FeatureText>
									</FeatureColumn>
									</div>
								// </Link>
							)


						}
					}


					)}
				</FeatureWrapper>
			</Container>
		</Section>
	);
};

export default Products;
