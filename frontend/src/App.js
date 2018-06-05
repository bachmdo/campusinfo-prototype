import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { events: {} };
  }

  async componentDidMount() {
    console.log('Attempting to fetch timetable');
    const stream = await fetch('http://localhost:4000/username', {
      method: 'POST',
      body: JSON.stringify({ username: 'bachmdo2' })
    });
    const response = await stream.json();
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
        <div className="Row">
          <div className="RowHeader">day</div>
        </div>
      </div>
    );
  }
}

export default App;
