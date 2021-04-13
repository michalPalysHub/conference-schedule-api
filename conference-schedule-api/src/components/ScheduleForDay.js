import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { API_BASE_URL } from '../constants';

export class ScheduleForDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduledSessions: [],
            sessions: null,
            rooms: null,
            presentations: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.scheduledSessions !== prevProps.scheduledSessions) {
            this.setState({
                scheduledSessions: this.props.scheduledSessions
            });
        }
        if (this.props.allSessions !== prevProps.allSessions) {
            this.setState({
                sessions: this.props.allSessions
            });
        }
        if (this.props.rooms !== prevProps.rooms) {
            this.setState({
                rooms: this.props.rooms
            });
        }
        if (this.props.presentations !== prevProps.presentations) {
            this.setState({
                presentations: this.props.presentations
            }, () => console.log(this.state.presentations));
        }
    }

    compareStringDates(a, b) {
        if (a.date.slice(0, 10) > b.date.slice(0, 10)) {
            return 1;
        }
        if (a.date.slice(0, 10) < b.date.slice(0, 10)) {
            return -1;
        }
        if (a.date.slice(0, 10) === b.date.slice(0, 10)) {
            if (a.date.slice(11, 16) > b.date.slice(11, 16)) {
                return 1;
            }
            if (a.date.slice(11, 16) < b.date.slice(11, 16)) {
                return -1;
            }
            return 0;
        }
    }

    render() {
        if (this.state.scheduledSessions === null ||
            this.state.sessions === null ||
            this.state.rooms === null ||
            this.state.presentations === null
        ) {
            return (
                <h2>Loading...</h2>
            );
        } else {
            return (
                <div className="my-4">
                    <Card>
                        <Card.Header as="h3" className="text-center">
                            Schedule for {this.props.dayOfTheWeek}
                        </Card.Header>
                        <Card.Body>
                            {this.state.scheduledSessions.map(enitity =>
                                <div key={enitity.start}>
                                    <h5>{enitity.start.slice(11, 16)}-{enitity.end.slice(11, 16)}</h5>
                                    <ul>
                                        {enitity.sessions.map(sessionName =>
                                            <li key={sessionName}>
                                                <h6>{this.state.sessions[sessionName].name + " "}
                                                    <a href={("https://www.google.com/maps/search/?api=1&query=" +
                                                        this.state.rooms[this.state.sessions[sessionName].localization].lat + "," +
                                                        this.state.rooms[this.state.sessions[sessionName].localization].lng)}
                                                        target="_blank" rel="noopener noreferrer">
                                                        ({this.state.rooms[this.state.sessions[sessionName].localization].name})
                                                    </a>
                                                </h6>
                                                <ul>
                                                    {this.state.presentations.filter(p => {
                                                        return p.session === sessionName;
                                                    }).filter(p => {
                                                        return (p.date.slice(0, 10) === enitity.start.slice(0, 10) &&
                                                            p.date.slice(11, 16) >= enitity.start.slice(11, 16) &&
                                                            p.date.slice(11, 16) <= enitity.end.slice(11, 16));
                                                    }).sort(this.compareStringDates).map(presentation =>
                                                        <li>
                                                            {presentation.date.slice(11, 16) + " "}
                                                            {presentation.title === "" ? <p>{presentation.title}</p> : 
                                                            <a href={`${API_BASE_URL}abstracts/${presentation.filename}`}
                                                                target="_blank" rel="noopener noreferrer">
                                                                {presentation.title}
                                                            </a>}
                                                        </li>
                                                    )}
                                                </ul>
                                                <br />
                                            </li>)
                                        }
                                    </ul>
                                    <hr />
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }
}