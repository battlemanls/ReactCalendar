import React, { Component } from 'react';
import './components/style/App.css';
import CCalendar from './components/CCalendar'
import './components/style/CCalendar.css'

class App extends Component {

    constructor() {
        super();
        this.dataCalendar = [
            {date: "20.02.2019", events:[{name:"Football", body:"Game Germany - Italy", time: "20:00"}, {name:"Football", body:"Game R - G", time: "20:00"}]},
            {date: "07.02.2019", events:[{name:"Cinema", body:"Interstellar", time: "19:00"}]},
            {date: "11.02.2019", events:[{name:"Cinema", body:"Interstellar", time: "20:00"}]},
            {date: "21.02.2019", events:[{name:"Football", body:"Game Italy - Germany", time: "20:00"}, {name:"Football", body:"Game G - R", time: "21:00"}]},
            {date: "15.02.2019", events:[{name:"Cinema", body:"Bad boys", time: "19:00"}]},
            {date: "18.02.2019", events:[{name:"Cinema", body:"Aladdin disney", time: "19:00"}]},
            {date: "25.02.2019", events:[{name:"Cinema", body:"Aladdin disney", time: "21:00"}]},
            {date: "07.03.2019", events:[{name:"Cinema", body:"Interstellar", time: "19:00"}]},
            {date: "10.03.2019", events:[{name:"Cinema", body:"Interstellar", time: "21:00"}]},
            {date: "18.03.2019", events:[{name:"Cinema", body:"Aladdin disney", time: "19:00"}]},
        ]
        this.state = {value: "", name:"", body:"", time:"" };
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fCalendar()
    }

    fCalendar(){ // отображение календаря
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

    formRender(){
        var formR = <form onSubmit={this.handleSubmit}>
            <label>
                Date: <input type="text" value={this.state.value} placeholder="DD.MM.YYYY" required pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" onChange={this.handleChange}  />
                Name: <input type="text" value={this.state.name}  placeholder="Name event"  onChange={this.handleNameChange}  />
                Body: <input type="text" value={this.state.body} placeholder="description event" onChange={this.handleBodyChange}  />
                Time: <input type="time" value={this.state.time} placeholder="time event" onChange={this.handleTimeChange}  />
            </label>
            <input type="submit" className="button-1" value="Submit" />
        </form>
        return formR
    }

    render () {
        return (

    <div>
        {this.myCalendar}

    </div>
        )
    }

}

export default App;

