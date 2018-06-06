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
        target.classList.add('full');
        target.innerText = event.name;
        for (let i = 1; i < event.slots.length; i++) {
          target = target.nextSibling;
          target.classList.add('full');
        }
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Day">
          <div className="Slot">
            ZHAW<br />Timetable
          </div>
          {this.state.days[0].slots.map((slot, index) => {
            const m = moment(slot.startTime).format('HH:mm');
            return (
              <div className="Slot" key={"time".concat(slot.startTime)}>
                {m}
              </div>
            );
          })}
        </div>
        {this.state.days.map((day) => {
          if (moment(day.date).isoWeekday() !== 7) {
            return <Day key={"day".concat(day.date)} day={day} />;
          } else return null;
        })}
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
        return <Slot key={"slot".concat(slot.startTime)} slot={slot} />;
      })}
    </div>
  );
};

const Slot = (props) => {
  return <div className="Slot" id={props.slot.startTime} />;
};

export default App;
