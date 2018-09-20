import React, { Component } from 'react';
import { format, getISODay, startOfWeek } from 'date-fns';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [{ slots: [] }],
      displayDate: format(
        startOfWeek(new Date(), { weekStartsOn: 1 }),
        'YYYY-MM-DD'
      ),
      userName: 'bachmdo2'
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTimetable = this.updateTimetable.bind(this);
  }

  componentDidMount() {
    this.updateTimetable();
  }

  componentDidUpdate() {
    //TODO do this with React instead of getElementById
    this.state.days.forEach((day) => {
      day.events.forEach((event) => {
        let target = document.getElementById(`${event.startTime}`);
        target.classList.add('Event');
        target.innerText = event.name;
        for (let i = 1; i < event.slots.length; i++) {
          target = target.nextSibling;
          target.classList.add('Event');
        }
      });
    });
  }

  handleChange(e) {
    this.setState({ userName: e.target.value });
  }

  async updateTimetable() {
    const stream = await fetch('http://localhost:4000/username', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: this.state.userName,
        startDate: this.state.displayDate
      })
    });
    const response = await stream.json();
    response.days && this.setState({ days: response.days });
  }

  render() {
    return (
      <div className="App">
        <div className="Top">
          <BackButton />
          <ForwardButton />
          <input
            type="text"
            name="userName"
            onChange={this.handleChange}
            defaultValue={this.state.userName}
          />
          <input type="button" onClick={this.updateTimetable} value="Update" />
        </div>
        <div className="Table">
          <div className="Day">
            <div className="Slot">
              ZHAW
              <br />
              Timetable
            </div>
            {this.state.days[0].slots.map((slot, index) => {
              const date = format(new Date(slot.startTime), 'HH:mm');
              return (
                <div className="Slot" key={'time'.concat(slot.startTime)}>
                  {date}
                </div>
              );
            })}
          </div>
          {this.state.days.map((day) => {
            if (getISODay(new Date(day.date)) !== 7) {
              return <Day key={'day'.concat(day.date)} day={day} />;
            } else return null;
          })}
        </div>
      </div>
    );
  }
}

const Day = (props) => {
  const date = new Date(props.day.date);
  return (
    <div className="Day">
      <div className="Slot">
        {format(date, 'dd')}
        <br />
        {format(date, 'DD.MM')}
      </div>
      {props.day.slots.map((slot, index) => {
        return <Slot key={'slot'.concat(slot.startTime)} slot={slot} />;
      })}
    </div>
  );
};

const Slot = (props) => {
  return <div className="Slot" id={props.slot.startTime} />;
};

const BackButton = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-arrow-left">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
};

const ForwardButton = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-arrow-right">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
};

export default App;
