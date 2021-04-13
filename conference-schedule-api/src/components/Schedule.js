import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import { ScheduleForDay } from './ScheduleForDay';

export class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayOfTheWeek: 'monday',
			scheduledSessions: [],
			allSessions: null,
			rooms: null,
			presentations: null
		};
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		this.getSchedulesFromApi();
		this.getAllSessionsFromApi();
		this.getRoomsFromApi();
		this.getPresentationsFromApi();
	}

	handleSelect(key) {
		this.setState({
			dayOfTheWeek: key
		},
			this.getSchedulesFromApi
		);
	}


	getSchedulesFromApi() {
		axios.get(API_BASE_URL + "schedules?day=" + this.state.dayOfTheWeek)
			.then(res => {
				const data = res.data[0][this.state.dayOfTheWeek.toUpperCase()];
				this.setState({
					scheduledSessions: data
				});
			})
			.catch(error => console.log(error));
	}

	getAllSessionsFromApi() {
		axios.get(API_BASE_URL + "sessions")
			.then(res => {
				const data = res.data;
				this.setState({
					allSessions: data
				});
			})
			.catch(error => console.log(error));
	}

	getRoomsFromApi() {
		axios.get(API_BASE_URL + "rooms")
			.then(res => {
				const data = res.data;
				this.setState({
					rooms: data
				});
			})
			.catch(error => console.log(error));
	}

	getPresentationsFromApi() {
		axios.get(`${API_BASE_URL}presentations`)
			.then(res => {
				const presentations = res.data;
				this.setState({ presentations });
			})
			.catch(error => console.log(error));
	}


	render() {
		return (
			<div className="mt-4">
				<Tabs
					activeKey={this.state.dayOfTheWeek}
					onSelect={this.handleSelect}
				>
					<Tab eventKey="monday" title="Monday">
						<ScheduleForDay dayOfTheWeek={this.state.dayOfTheWeek} scheduledSessions={this.state.scheduledSessions} allSessions={this.state.allSessions}
							rooms={this.state.rooms} presentations={this.state.presentations}/>
					</Tab>
					<Tab eventKey="tuesday" title="Tuesday">
						<ScheduleForDay dayOfTheWeek={this.state.dayOfTheWeek} scheduledSessions={this.state.scheduledSessions} allSessions={this.state.allSessions}
							rooms={this.state.rooms} presentations={this.state.presentations}/>
					</Tab>
					<Tab eventKey="wednesday" title="Wednesday">
						<ScheduleForDay dayOfTheWeek={this.state.dayOfTheWeek} scheduledSessions={this.state.scheduledSessions} allSessions={this.state.allSessions}
							rooms={this.state.rooms} presentations={this.state.presentations}/>
					</Tab>
					<Tab eventKey="thursday" title="Thursday">
						<ScheduleForDay dayOfTheWeek={this.state.dayOfTheWeek} scheduledSessions={this.state.scheduledSessions} allSessions={this.state.allSessions}
							rooms={this.state.rooms} presentations={this.state.presentations}/>
					</Tab>
					<Tab eventKey="friday" title="Friday">
						<ScheduleForDay dayOfTheWeek={this.state.dayOfTheWeek} scheduledSessions={this.state.scheduledSessions} allSessions={this.state.allSessions}
							rooms={this.state.rooms} presentations={this.state.presentations}/>
					</Tab>
				</Tabs>
			</div>
		);
	}
}