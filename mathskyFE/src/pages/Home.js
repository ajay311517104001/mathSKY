import React,{ useRef,useState }  from 'react';
import Carousel from '../components/Carousel/Carousel';
import { Content } from '../components/Content/Content';
import Products from '../components/Products/Products';
import Hero from '../components/Hero/Hero';
import { heroOne, heroTwo, heroThree } from '../data/HeroData';
import Navbar from '../components/Navbar/Navbar';


// Hero Feature Content Carousel
const scrollToRef = (ref) => window.scrollTo( {top: 800, behavior: 'smooth' })
const Home = () => {
	const [dynamicPath,setDynamicPath]=useState('')


	const myRef = useRef(null)
	const executeScroll = () => scrollToRef(myRef)
	return (
		<>
		<Navbar />

			<Hero executeScroll={executeScroll}/>
			<Products  myRef={myRef}/>
			{/* <Content {...heroOne} /> */}
			<Content {...heroTwo} />
			{/* <Content {...heroThree} /> */}
			{/* <Carousel /> */}

		</>
	);
};

export default Home;
