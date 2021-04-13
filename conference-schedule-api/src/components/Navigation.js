import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class Navigation extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/schedule">Schedule</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<NavLink className="d-inline p-2 bg-dark text-white"
							to="/presentations">Presentations</NavLink>
						<NavDropdown title="Reminders" className="bg-dark text-white" >
							<NavDropdown.Item href="/reminders">List of reminders</NavDropdown.Item>
							<NavDropdown.Item href="/reminders/add">Add reminder</NavDropdown.Item>
							{/*<NavDropdown.Item href="/reminders/change">Change reminder</NavDropdown.Item>*/}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						<NavDropdown title="Users" className="bg-dark text-white" >
							<NavDropdown.Item href="/about">About me</NavDropdown.Item>
							<NavDropdown.Item href="/update">Update user info</NavDropdown.Item>
							<NavDropdown.Item href="/register">Register</NavDropdown.Item>
						</NavDropdown>
						<NavLink className="d-inline p-2 bg-dark text-white"
							to="/authorize">Authorize
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}


