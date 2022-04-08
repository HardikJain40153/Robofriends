import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';


function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState(['']);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => setRobots(users))
	}, [])

	const onsearchChange = (event) => {
		setSearchfield(event.target.value);
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toString().toLowerCase().includes(searchfield.toString().toLowerCase());
	})

	return !robots.length ?
		<h1>Loading...</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onsearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
}
export default App;