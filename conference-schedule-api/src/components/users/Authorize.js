import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';


export class Authorize extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
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

		const credentials = btoa(`${this.state.username}:${this.state.password}`);
		const headers = {
			Authorization: `Basic ${credentials}`
		}

		axios.post(`${API_BASE_URL}auth`, {}, { headers })
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
					else if (error.response.status === 401) {
						const message = "Invalid credentials!";
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

	redirectToRegister = () => {
		const {history} = this.props;
		if (history) history.push('/register');
	}

	render() {
		return (
			<div className="mt-4">
				<Card>
					<Card.Header as="h4" className="text-center">
						Authorize
					</Card.Header>
					<Card.Body>
						<Alert show={this.state.showSuccess} variant='success' className="text-center">
							You have been authorized successfully! : )
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
								<Form.Control type="email" name="username" value={this.state.username} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
							</Form.Group>
							<Button variant="primary" type="submit">
								Log In
  							</Button>
						</Form>
					</Card.Body>
					<Card.Footer className="text-muted">
						<span>Don't have an account yet?</span>
						<span onClick={() => this.redirectToRegister()}> Click <strong>here</strong></span>
					</Card.Footer>
				</Card>
			</div>
		);
	}
}