import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';


export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
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

		axios.post(`${API_BASE_URL}users`, {email: this.state.email, password: this.state.password})
			.then(res => {
				if (res.status === 201) {
					const token = res.data.token;
					localStorage.setItem("JWT", token);

					this.setState({
						showSuccess: true,
						showWarning: false,
						showDanger: false
					});
				}
			})
			.catch(error => {
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
					else if (error.response.status === 409) {
						const message = error.response.data.message;;
						this.setState({
							showSuccess: false,
							showWarning: false,
							showDanger: true,
							dangerMessage: message
						})
					}
				}
			});
	}

	render() {
		return (
			<div className="mt-4">
				<Card>
					<Card.Header as="h4" className="text-center">
						Register
					</Card.Header>
					<Card.Body>
						<Alert show={this.state.showSuccess} variant='success' className="text-center">
							You have been registered successfully! Now you can access protected end-points now.
 						</Alert>
						<Alert show={this.state.showWarning} variant='warning' className="text-center">
							{this.state.warningMessage}
						</Alert>
						<Alert show={this.state.showDanger} variant='danger' className="text-center">
							{this.state.dangerMessage}
						</Alert>
						<Form onSubmit={this.handleSubmit} className="mb-3">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
							</Form.Group>
							<Button variant="primary" type="submit">
								Register
  							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		);
	}
}