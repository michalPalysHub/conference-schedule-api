import React, { Component } from 'react';
import { Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';


export class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			id: "",
			email: "",
			createdAt: "",
			showInfo: false,
			showDanger: false
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
			() => axios.get(`${API_BASE_URL}users/me`, { headers: { "Authorization": `Bearer ${this.state.token}` } })
				.then(res => {
					if (res.status === 200) {
						this.setState({
							id: res.data.id,
							email: res.data.email,
							createdAt: res.data.createdAt,
							showInfo: true,
							showDanger: false
						})
					}
				})
				.catch(error => {
					if (error.response) {
						if (error.response.status === 400) {
							this.setState({
								showInfo: false,
								showDanger: true
							})
						}
					}
				})
		);
	}

	render() {
		return (
			<div className="mt-5">
				<Card>
					<Card.Header as="h4" className="text-center">
						About me
					</Card.Header>
					<Card.Body>
						<Alert show={this.state.showDanger} variant='danger' className="text-center">
							You are not authorized! <Alert.Link href="/authorize">Authorize here</Alert.Link>
						</Alert>
						<Alert show={this.state.showInfo} variant='info' className="text-center">
							<dl>
								<dt>ID: </dt>
								<dd>{this.state.id}</dd>

								<dt>Email: </dt>
								<dd>{this.state.email}</dd>

								<dt>Created at: </dt>
								<dd>{this.state.createdAt.slice(0,10)} {this.state.createdAt.slice(11,16)}</dd>
							</dl>
						</Alert>
					</Card.Body>
				</Card>
			</div>
		);
	}
}