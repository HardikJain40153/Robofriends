import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onsearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobot: () => dispatch(requestRobots())
	}
}

function App(props) {
	const { searchField, onsearchChange, robots, isPending, onRequestRobot } = props;

	useEffect(() => {
		onRequestRobot();
	}, [onRequestRobot])

	const filteredRobots = robots.filter(robot => {
		return robot.name.toString().toLowerCase().includes(searchField.toString().toLowerCase());
	})

	return isPending ?
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

export default connect(mapStateToProps, mapDispatchToProps)(App);