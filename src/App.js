import React, { Component } from 'react';
import './components/style/App.css';
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import CCalendar from './components/CCalendar'
import './components/style/CCalendar.css'

class App extends Component {

    constructor() {
        super();
        this.dataCalendar = [
            {date: "20.02.2019", events:[{name:"Football", body:"Game Germany - Italy", time: "20:00"}]},
            {date: "19.02.2019", events:[{name:"Cinema", body:"Bad boys", time: "19:00"}]},
            {date: "15.03.2019", events:[{name:"Cinema", body:"Aladdin disney", time: "19:00"}]},
            {date: "07.02.2019", events:[{name:"Cinema", body:"Interstellar", time: "19:00"}]}
        ]
        this.state = {value: "", name:"", body:"", time:"" };
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fCalendar()
    }

    fCalendar(){
        this.myCalendar =  < CCalendar data={this.dataCalendar} />
    }

    handleChange(event) {

        this.setState({value: event.target.value });

    }

    handleNameChange(event) {

        this.setState({name: event.target.value});

    }

    handleBodyChange(event) {

        this.setState({body: event.target.value});

    }

    handleTimeChange(event) {

        this.setState({time: event.target.value});

    }

    handleSubmit(event) {
        this.dataCalendar.push({date: this.state.value, events:[{name: this.state.name, body: this.state.body, time: this.state.time}]})
        event.preventDefault();
        this.fCalendar()
        this . forceUpdate ( ) ;

    }

    render () {
        return (
    <div>
        <h3>Event:</h3>
        <form onSubmit={this.handleSubmit}>
            <label>
                Date: <input type="text" value={this.state.value} placeholder="DD.MM.YYYY" required pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" onChange={this.handleChange}  />
                Name: <input type="text" value={this.state.name}  placeholder="Name event"  onChange={this.handleNameChange}  />
                Body: <input type="text" value={this.state.body} placeholder="description event" onChange={this.handleBodyChange}  />
                Time: <input type="time" value={this.state.time} placeholder="time event" onChange={this.handleTimeChange}  />
            </label>
            <input type="submit" className="button-1" value="Submit" />
        </form>
        {this.myCalendar}
    < MainContent/>
                <Footer />
    </div>
        )
    }

}

export default App;

