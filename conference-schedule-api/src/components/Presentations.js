import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Card, Accordion } from 'react-bootstrap';
import { API_BASE_URL } from '../constants';

export class Presentations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keyword: "",
			date: "",
			author: "",
			title: "",
			presentations: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getDataFromApi(query = "") {
		axios.get(`${API_BASE_URL}presentations${query}`)
			.then(res => {
				const presentations = res.data;
				this.setState({ presentations });
			})
			.catch(error => console.log(error));
	}

	componentDidMount() {
		this.getDataFromApi();
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
		let query = "";

		if (this.state.keyword && this.state.keyword.length > 0) {
			query += ("keyword=" + this.state.keyword);
		}
		if (this.state.date) {
			query += ("&date=" + this.state.date);
		}
		if (this.state.author) {
			query += ("&author=" + this.state.author);
		}
		if (this.state.title) {
			query += ("&title=" + this.state.title);
		}

		if (query.length > 0) query = "?" + query;

		this.getDataFromApi(query);
	}

	render() {
		return (
			<div className="mt-4 mb-5">
				<Card>
					<Card.Header className="text-center" as="h4">
						Search for presentation
					</Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Keyword</Form.Label>
								<Form.Control name="keyword" type="text" value={this.state.keyword} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Date</Form.Label>
								<Form.Control name="date" type="text" value={this.state.date} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Author</Form.Label>
								<Form.Control name="author" type="text" value={this.state.author} onChange={this.handleInputChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
 							</Button>
						</Form>
					</Card.Body>
				</Card>
				<Card className="mt-4 mb-5">
					<Card.Header as="h4" className="text-center">
						List of the presentations
					</Card.Header>
					<Card.Body>
						<Accordion>
							{this.state.presentations.map(presentation =>
								<Card key={presentation.id}>
									<Accordion.Toggle as={Card.Header} eventKey={presentation.id}>
										Title: {presentation.title}
										<br />
										Authors:
										<ul>
											{presentation.authors.map(author => <li>{author}</li>)}
										</ul>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={presentation.id}>
										<Card.Body>
											Date: {presentation.date.slice(0,10)} {presentation.date.slice(11,16)}<br />
											Session: {presentation.session}<br />
											Id: {presentation.id}<br />
											Filename: {presentation.filename === "" ? "none" :
												<a href={`${API_BASE_URL}abstracts/${presentation.filename}`}
													target="_blank" rel="noopener noreferrer">
													{presentation.filename}
												</a>
											}
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