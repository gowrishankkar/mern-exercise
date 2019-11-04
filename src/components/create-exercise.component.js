import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangerUsername = this.onChangerUsername.bind(this);
    this.onChangerDescription = this.onChangerDescription.bind(this);
    this.onChangerDuration = this.onChangerDuration.bind(this);
    this.onChangerDate = this.onChangerDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/users/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
  }

  onChangerUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangerDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangerDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  onChangerDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      desscription: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);

    axios
      .post("http://localhost:3000/exercises/add", exercise)
    //   .then(res => console.log(res.data));
    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <lable>Username: </lable>
            <select
              ref="userinput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangerUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangerDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes):</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangerDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangerDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
