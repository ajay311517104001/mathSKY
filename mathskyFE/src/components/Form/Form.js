import React, { useState } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container, Section } from '../../globalStyles';


import {validateForm,validateFormlogin} from './validateForm';
import axios from "axios"
import { useLocation, useHistory } from 'react-router-dom';


import "./Form.css";
import { authSignInApi, authSignUpApi } from '../../ApiService';

const SignUpForm = () => {
	let history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleSubmit = async(e) => {
		e.preventDefault();
		const resultError = validateForm({ name, email, password, confirmPass });

		if (resultError !== null) {
			setError(resultError);
		
			return;
		}else{
			console.log("im fired")
			let clientData ={
			   username:name,
			   email:email,
			   password:password
		   }

			authSignUpApi(clientData)
			.then((res)=>{
				console.log("the signUp res ", res)
			localStorage.setItem('accessToken',  JSON.stringify(res.accessToken))
			localStorage.setItem('username',JSON.stringify(res.username))
			localStorage.setItem('userId',JSON.stringify(res.userId))
			
			history.push('/');
			})




	
		// await axios({
		// 	method: 'post',
		// 	url: 'http://localhost:8001/api/auth/register',
		// 	data: clientData,
		//   }).then((res)=>{
		// 	  console.log("the siginup res", res)
		// 	setSuccess('Application was submitted!');
		// 	console.log("the response is ", res.data)
		// 	localStorage.setItem('accessToken',  JSON.stringify(res.data.accessToken))
		// 	localStorage.setItem('username',JSON.stringify(res.data.username))
		// 	localStorage.setItem('userId',JSON.stringify(res.data.userId))
			
		// 	history.push('/');
		// })
	
		  .catch((err)=>{
			  
			setSuccess('User Already Exists! Try Login or Try another Email id');
			console.log("the error is ", err)})

		}
		setName('');
		setEmail('');
		setPassword('');
		setConfirmPass('');
		setError(null);
		
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Name', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Password',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: 'password',
		},
		{
			label: 'Confirm Password',
			value: confirmPass,
			onChange: (e) => setConfirmPass(e.target.value),
			type: 'password',
		},
	];
	return (
		<FormSection>
			<Container >
				<FormRow >
					<FormColumn style={{marginTop:'10%',marginBottom:'18%'}} small>
						<FormTitle>Sign up</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton type="submit">Signup</FormButton>
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};


const SignInForm = () => {
	let history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleSubmit = async(e) => {
		e.preventDefault();
		const resultError = validateFormlogin({  email, password });

		if (resultError !== null) {
			setError(resultError);
		
			return;
		}else{
			console.log("im fired")
         let clientData ={

			email:email,
			password:password
		}

		authSignInApi(clientData)
		.then((res)=>{
			console.log("the signUp res ", res)
		localStorage.setItem('accessToken',  JSON.stringify(res.accessToken))
		localStorage.setItem('username',JSON.stringify(res.username))
		localStorage.setItem('userId',JSON.stringify(res.userId))
		
		history.push('/');
		})

		  .catch((err)=>{
			  
			setSuccess('Invalid credentials');
			console.log("the error is ", err)})

		}

		setEmail('');
		setPassword('');

		setError(null);
		
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [

		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Password',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: 'password',
		},
		
	];
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn style={{marginTop:'10%',marginBottom:'65%'}} small>
						<FormTitle>Sign In</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton type="submit">SignIn</FormButton>
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};




// const SignInForm = ()=>  {
//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log(e.target.email.value);

//     if (!e.target.email.value) {
//       alert("Email is required");
//     } else if (!e.target.email.value) {
//       alert("Valid email is required");
//     } else if (!e.target.password.value) {
//       alert("Password is required");
//     } else if (
//       e.target.email.value === "me@example.com" &&
//       e.target.password.value === "123456"
//     ) {
//       alert("Successfully logged in");
//       e.target.email.value = "";
//       e.target.password.value = "";
//     } else {
//       alert("Wrong email or password combination");
//     }
//   };

//  const  handleClick = e => {
//     e.preventDefault();

//     alert("Goes to registration page");
//   };


//     return (
//       <div className="Appp">

//         <form className="formm" onSubmit={handleSubmit}>
//           <div className="input-groupp">
//             <label htmlFor="email">Email</label>
//             <input type="email" name="email" placeholder="nome@email.com.br" />
//           </div>
//           <div className="input-groupp">
//             <label htmlFor="password">Senha</label>
//             <input type="password" name="password" />
//           </div>
//           <button className="primaryy">ENTRAR</button>
//         </form>
//         <button className="secondaryy" onClick={handleClick}>
//           Criar uma nova conta
//         </button>
//       </div>
//     );
//   }


//   const SignUpForm = ()=>  {
// 	const handleSubmit = e => {
// 	  e.preventDefault();
// 	  console.log(e.target.email.value);
  
// 	  if (!e.target.email.value) {
// 		alert("Email is required");
// 	  } else if (!e.target.email.value) {
// 		alert("Valid email is required");
// 	  } else if (!e.target.password.value) {
// 		alert("Password is required");
// 	  } else if (
// 		e.target.email.value === "me@example.com" &&
// 		e.target.password.value === "123456"
// 	  ) {
// 		alert("Successfully logged in");
// 		e.target.email.value = "";
// 		e.target.password.value = "";
// 	  } else {
// 		alert("Wrong email or password combination");
// 	  }
// 	};
  
//    const  handleClick = e => {
// 	  e.preventDefault();
  
// 	  alert("Goes to registration page");
// 	};
  
  
// 	  return (
// 		  <div style={{margin:0,padding:0,background:'#071c2f', height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
// <div className="Appp">
  
//   <form className="formm" onSubmit={handleSubmit}>
//   <div className="input-groupp">
// 	  <label htmlFor="email">Name</label>
// 	  <input type="text" name="name" placeholder="mathsky" />
// 	</div>
// 	<div className="input-groupp">
// 	  <label htmlFor="email">Email</label>
// 	  <input type="email" name="email" placeholder="nome@email.com.br" />
// 	</div>
// 	<div className="input-groupp">
// 	  <label htmlFor="password">Password</label>
// 	  <input type="password" name="password" />
// 	</div>
// 	<div className="input-groupp">
// 	  <label htmlFor="password">confirm Password</label>
// 	  <input type="password" name="password" />
// 	</div>
// 	<button style={{paddingLeft:15,paddingRight:15, paddingTop:10 , paddingBottom:10,backgroundColor:"rgb(7, 28, 47)", color:'white', borderRadius:5}}>SignUp</button>
//   </form>
//   <button className="secondaryy" onClick={handleClick}>
// 	Criar uma nova conta
//   </button>
// </div>

// 		  </div>
// 			  );
// 	}
  




export  { SignUpForm,SignInForm};
