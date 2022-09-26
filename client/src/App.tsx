import React, { useEffect } from 'react';
import axios from './lib/axios';
import { ChakraProvider } from './components/chakra';

import './App.css';
import Login from './components/Auth/Login';

function App() {

	return (
		<ChakraProvider>
			<div className='App'>
				<div>
					<Login />
				</div>
			</div>
		</ChakraProvider>
	);
}

export default App;
