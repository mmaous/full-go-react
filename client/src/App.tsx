import React, { useEffect } from 'react';
import axios from './lib/axios';

import './App.css';

function App() {
	// const [welcome, setWelcome] = React.useState<string | null>(null);
	useEffect(() => {
		// fetch('https://cors-test.appspot.com/test', {
		axios
			.get('/api/welcome')
			.then((res) => {
				console.log(res);
				// setWelcome(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className='App'>
			Hello Curious Programmer!
			<br />
			{/* Server says: {JSON.stringify(welcome)} */}
			<button>Click Me</button>
		</div>
	);
}

export default App;
