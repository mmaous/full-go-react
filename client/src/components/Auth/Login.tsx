// create a simple login form with chakra ui

import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='shadow-login max-w-lg p-2.5 mx-auto my-48  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-8'>
				<div>
					<img
						className='mx-auto h-12 w-auto'
						src='https://user-images.githubusercontent.com/17799273/191329484-cee8623f-7b80-44c8-ba07-dd087b239c46.png'
						alt='Your Company'
					/>
					<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
				</div>

				<form className='mt-8 space-y-6' action='#'>
					<FormControl id='email'>
						<FormLabel>Email address</FormLabel>
						<Input
							autoComplete='email'
							required
							className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
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
							className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
							placeholder='Password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								id='remember-me'
								name='remember-me'
								type='checkbox'
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
							<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
								Remember me
							</label>
						</div>

						<div className='text-sm'>
							<a href='#' className='font-medium text-black-600 hover:text-black-500'>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<Button backgroundColor={"#000212"} type='submit' className=' flex text-white w-full justify-center py-2 px-4 hover:text-sky-800'>
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
