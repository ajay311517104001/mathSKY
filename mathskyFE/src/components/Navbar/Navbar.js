import React, { useState,useEffect } from 'react';
import { FaRProject, FaTimes } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import {
	Nav,
	NavbarContainer,
	NavLogo,
	NavIcon,
	MobileIcon,
	NavMenu,
	NavLinks,
	NavItem,
} from './NavbarStyles.js';
import { useLocation, useHistory } from 'react-router-dom';
import { data } from '../../data/NavbarData';


const Navbar = () => {
	const [show, setShow] = useState(false);
const [name,setName]=useState('')
	let history = useHistory();
	let location = useLocation();

	const handleClick = () => {
		setShow(!show);
	};

	const scrollTo = (id) => {
		const element = document.getElementById(id);

		element.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(()=>{


		if(localStorage.getItem("username")){
			let name =JSON.parse(localStorage.getItem("username"))

			setName(name)
		}
	},[])

	const closeMobileMenu = (to, id) => {
		if(id=="about"){
			if (id && location.pathname === '/') {
				scrollTo(id);
			}
	
			history.push(to);
			setShow(false);
		}
		else if (id=="signup"){
			history.push(to);
		}	
		// else if (id=="signin"){
		// 	history.push(to);
		// }
	
	};

	return (
		<IconContext.Provider value={{ color: '#fff' }}>
			<Nav>
				<NavbarContainer>
					<NavLogo to="/">
						{/* <NavIcon src="./assets/logo.png" alt="logo" /> */}
						Centum
					</NavLogo>
					<MobileIcon onClick={handleClick}>
						{show ? <FaTimes /> : <CgMenuRight />}
					</MobileIcon>
					{localStorage.getItem("accessToken")?
					<NavMenu show={show}>

						<NavItem >
                               <NavLinks>
							   Hi, { name}
							   </NavLinks>
						

						</NavItem>

						<NavItem onClick={()=>{localStorage.clear();
						history.push('/');  }} >
                               <NavLinks>
							   logout
							   </NavLinks>
						

						</NavItem>

				</NavMenu>

				:
				<NavMenu show={show}>
				{data.map((el, index) => (
					<NavItem key={index}>
						<NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
							{el.text}
						</NavLinks>
					</NavItem>
				))}
			</NavMenu>
				}
				
				</NavbarContainer>
			</Nav>
		</IconContext.Provider>
	);
};

export default Navbar;
