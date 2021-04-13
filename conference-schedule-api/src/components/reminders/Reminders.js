import React, { Component } from 'react';
import { Card, Alert, Accordion, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';

export class Reminders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showWarning: false,
			showDanger: false,
			warningMessage: "",
			dangerMessage: "",
			reminders: [],
			token: ""
		}
	}

	componentDidMount() {
		this.getDataFromApi();
	}

	getDataFromApi() {
		const token = localStorage.getItem("JWT");
		this.setState({
			token: token,
		},
			() => {
				axios.get(`${API_BASE_URL}reminders`, { headers: { "Authorization": `Bearer ${this.state.token}` } })
					.then(res => {
						if (res.status === 200) {
							if (res.data === null || res.data.length === 0) {
								this.setState({
									warningMessage: "There are no reminders for you!",
									showWarning: true,
									showDanger: false
								});
							} else {
								const urls = [];
								const requests = [];

								res.data.forEach(reminder => urls.push(`${API_BASE_URL}reminders/${reminder.id}`));
								urls.forEach(url => requests.push(axios.get(url, { headers: { "Authorization": `Bearer ${this.state.token}` } })));

								return axios.all(requests);
							}
						}
					})
					.then(axios.spread((...responses) => {
						const reminders = [];
						responses.forEach(res => {
							reminders.push(res.data);
						})
						this.setState({
							reminders: reminders
						})
					}))
					.catch(error => {
						if (error.response) {
							if (error.response.status === 401) {
								this.setState({
									dangerMessage: "You are not authorized!",
									showWarning: false,
									showDanger: true
								});
							}
							if (error.response.status === 403) {
								this.setState({
									dangerMessages: "Cannot access someone else reminder!",
									showWarning: false,
									showDanger: true
								});
							}
						}
					})
			})
	}

	render() {
		return (
			<div className="mt-4">
				<Card>
					<Card.Header as="h4" className="text-center">
						Reminders
					</Card.Header>
					<Card.Body>
						<Alert show={this.state.showWarning} variant='warning' className="text-center">
							<ul>
								{this.state.warningMessage}
							</ul>
						</Alert>
						<Alert show={this.state.showDanger} variant='danger' className="text-center">
							{this.state.dangerMessage}
						</Alert>
						<Accordion>
							{this.state.reminders.map(reminder =>
								<Card key={reminder.id}>
									<Accordion.Toggle as={Card.Header} eventKey={reminder.id}>
										Reminder from: {reminder.updatedAt.slice(0, 10)} {reminder.updatedAt.slice(11, 16)}
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={reminder.id}>
										<Card.Body>
											<dl>
												<dt>Presentation Id: </dt>
												<dd>{reminder.presentationId}</dd>

												<dt>Enabled: </dt>
												<dd>{reminder.enabled ? "Yes" : "No"}</dd>

												<dt>Updated at: </dt>
												<dd>{reminder.updatedAt}</dd>

												<dt>Created at: </dt>
												<dd>{reminder.createdAt.slice(0, 10)} {reminder.createdAt.slice(11, 16)}</dd>

												<dt>Notes: </dt>
												<dd>{reminder.notes}</dd>
											</dl>
											{/*
											<ButtonGroup>
												<Link to="/reminders/change">
													<Button variant="secondary">Change</Button>
												</Link>
												<Link to="/reminders/delete">
													<Button variant="secondary">Delete</Button>
												</Link>
											</ButtonGroup>
											*/}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							)}
						</Accordion>
					</Card.Body>
				</Card>
			</div>
		);
	}
}