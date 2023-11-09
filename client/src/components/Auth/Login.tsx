// create a simple login form with chakra ui

import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<div>
				<div>
					<img
						className='mx-auto h-12 w-auto'
						src='https://user-images.githubusercontent.com/17799273/191329484-cee8623f-7b80-44c8-ba07-dd087b239c46.png'
						alt='Your Company'
					/>
					<h2>Sign in to your account</h2>
				</div>

				<form className='mt-8 space-y-6' action='#'>
					<FormControl id='email'>
						<FormLabel>Email address</FormLabel>
						<Input
							autoComplete='email'
							required
							placeholder='Email address'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl id='password'>
						<FormLabel>Password</FormLabel>
						<Input
							autoComplete='current-password'
							required
							placeholder='Password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<input type='hidden' name='remember' defaultValue='true' />
					<div>
						<div>
							<input
								id='remember-me'
								name='remember-me'
								type='checkbox'
							/>
							<label htmlFor='remember-me'>
								Remember me
							</label>
						</div>

						<div className='text-sm'>
							<a href='#' >
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<Button backgroundColor={"#000212"} type='submit'>
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
