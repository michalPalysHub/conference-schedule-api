
import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';


export class AddReminder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			presentationId: "",
			notes: "",
			enabled: true,
			showSuccess: false,
			showWarning: false,
			showDanger: false,
			warningMessage: "",
			dangerMessage: ""
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const token = localStorage.getItem("JWT");
		this.setState({
			token: token,
		},
			() => {
				axios({
					method: 'post',
					url: `${API_BASE_URL}reminders`,
					headers: { "Authorization": `Bearer ${this.state.token}` },
					data: {
						presentationId: this.state.presentationId,
						notes: this.state.notes,
						enabled: this.state.enabled
					}
				}).then(res => {
					console.log(res.status)
					if (res.status === 200) {
						this.setState({
							showSuccess: true,
							showWarning: false,
							showDanger: false
						});
					}
				}).catch(error => {
					if (error.response) {
						if (error.response.status === 400) {
							const message = error.response.data.message;
							this.setState({
								showSuccess: false,
								showWarning: true,
								showDanger: false,
								warningMessage: message
							})
						}
						else if (error.response.status === 401) {
							this.setState({
								showSuccess: false,
								showWarning: false,
								showDanger: true,
								dangerMessage: "You are not authorized!"
							})
						}
					}
				});
			});
	}

	render() {
		return (
			<div className="mt-4">
				<Card>
					<Card.Header as="h4" className="text-center">
						Add reminder
					</Card.Header>
					<Card.Body>
						<Alert show={this.state.showSuccess} variant='success' className="text-center">
							Your reminder has been published successfully!
 						</Alert>
						<Alert show={this.state.showWarning} variant='warning' className="text-center">
							{this.state.warningMessage}
						</Alert>
						<Alert show={this.state.showDanger} variant='danger' className="text-center">
							{this.state.dangerMessage}
						</Alert>
						<Form onSubmit={this.handleSubmit} className="mb-3">
							<Form.Group>
								<Form.Label>Presentation Id</Form.Label>
								<Form.Control type="text" name="presentationId" value={this.state.presentationId} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Notes</Form.Label>
								<Form.Control type="text" name="notes" value={this.state.notes} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Enabled</Form.Label>
								<Form.Control as="select" name="enabled" value={this.state.enabled} onChange={this.handleInputChange}>
									<option value="true">true</option>
									<option value="false">false</option>
								</Form.Control>
							</Form.Group>
							<Button variant="primary" type="submit">
								Publish
  							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		);
	}
}