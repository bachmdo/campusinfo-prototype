import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [{ slots: [] }] };
  }

  async componentDidMount() {
    const stream = await fetch('http://localhost:4000/username', {
      method: 'POST',
      body: JSON.stringify({ username: 'bachmdo2' })
    });
    const response = await stream.json();
    response.days && this.setState({ days: response.days });
  }

  componentDidUpdate() {
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

  render() {
    return (
      <div className="App">
        <div className="Top">
          <BackButton />
          <ForwardButton />
        </div>
        <div className="Table">
          <div className="Day">
            <div className="Slot">
              ZHAW<br />Timetable
            </div>
            {this.state.days[0].slots.map((slot, index) => {
              const m = moment(slot.startTime).format('HH:mm');
              return (
                <div className="Slot" key={'time'.concat(slot.startTime)}>
                  {m}
                </div>
              );
            })}
          </div>
          {this.state.days.map((day) => {
            if (moment(day.date).isoWeekday() !== 7) {
              return <Day key={'day'.concat(day.date)} day={day} />;
            } else return null;
          })}
        </div>
      </div>
    );
  }
}

const Day = (props) => {
  const m = moment(props.day.date);
  return (
    <div className="Day">
      <div className="Slot">
        {m.format('dd')}
        <br />
        {m.format('DD.MM')}
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
