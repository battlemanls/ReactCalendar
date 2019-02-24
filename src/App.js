import React, { Component } from 'react';
import './components/style/App.css';
import CCalendar from './components/CCalendar'


class App extends Component {

    constructor() {
        super();
        this.dataCalendar = [
            {date: "20.02.2019", events:[{name:"Football", body:"Game Germany - Italy", time: "20:00"}, {name:"Football", body:"Game Spain - England", time: "20:00"}]},
            {date: "03.02.2019", events:[{name:"Cinema", body:"Interstellar", time: "20:00"}]},
            {date: "07.02.2019", events:[{name:"Cinema", body:"Memento", time: "19:00"}]},
            {date: "10.02.2019", events:[{name:"Cinema", body:"Insomnia", time: "21:00"}]},
            {date: "11.02.2019", events:[{name:"Cinema", body:"Batman Begins", time: "20:00"}]},
            {date: "21.02.2019", events:[{name:"Football", body:"Game Italy - Germany", time: "20:00"}, {name:"Football", body:"Game England - Spain", time: "21:00"}]},
            {date: "15.02.2019", events:[{name:"Cinema", body:"Bad boys", time: "19:00"}]},
            {date: "18.02.2019", events:[{name:"Cinema", body:"Aladdin disney", time: "19:00"}]},
            {date: "25.02.2019", events:[{name:"Cinema", body:"The Prestige", time: "21:00"}]},
            {date: "07.03.2019", events:[{name:"Cinema", body:"The Dark Knight", time: "19:00"}]},
            {date: "10.03.2019", events:[{name:"Cinema", body:"Inception", time: "21:00"}]},
            {date: "18.03.2019", events:[{name:"Cinema", body:"Dunkirk", time: "19:00"}]},
        ]
        this.state = {value: "", name:"", body:"", time:"" };
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fCalendar()
        this.noSelectBlock = this.noSelectBlock.bind(this)
        this.selectBlock = this.selectBlock.bind(this)
        this.selectBlock2 = this.selectBlock2.bind(this)
        this.selectBlock3 = this.selectBlock3.bind(this)
        this.selectBlock4 = this.selectBlock4.bind(this)
        this.openCreateEvent = this.openCreateEvent.bind(this)
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
        this.openCreateEvent()
        event.preventDefault();
        this.fCalendar()
        this . forceUpdate ( ) ;
    }

    openCreateEvent(){
       if(document.getElementById("layerEvents").style.display != "block"){
           document.getElementById("layerEvents").style.display = "block";
           document.getElementById("Calendar").style.display = "none";
       } else {
           this.setState({value: "", name:"", body:"", time:"" })
           document.getElementById("layerEvents").style.display = "none";
           document.getElementById("Calendar").style.display = "block";
       }
}

    addBEvent(){
    var buttonEvent =  <button className="ButtonAddEvent" onClick={this.openCreateEvent}>+</button>
    return buttonEvent
    }

    noSelectBlock(){
        document.getElementById("name-1").style.backgroundColor = "#E8E9EB"
        document.getElementById("name-3").style.backgroundColor = "#E8E9EB"
        document.getElementById("name-4").style.backgroundColor = "#E8E9EB"
        document.getElementById("name-5").style.backgroundColor = "#E8E9EB"
        document.getElementById("name-1").style.opacity = 0.5;
        document.getElementById("name-3").style.opacity = 0.5;
        document.getElementById("name-4").style.opacity = 0.5;
        document.getElementById("name-5").style.opacity = 0.5;

    }

    selectBlock(){
        this.noSelectBlock()
        document.getElementById("name-1").style.backgroundColor = "white"
        document.getElementById("name-1").style.opacity = 1

    }
    selectBlock2(){
        this.noSelectBlock()
        document.getElementById("name-3").style.backgroundColor = "white"
        document.getElementById("name-3").style.opacity = 1;

    }
    selectBlock3(){
        this.noSelectBlock()
        document.getElementById("name-4").style.backgroundColor = "white"
        document.getElementById("name-4").style.opacity = 1;
    }
    selectBlock4(){
        this.noSelectBlock()
        document.getElementById("name-5").style.backgroundColor = "white"
        document.getElementById("name-5").style.opacity = 1;
    }

    layerEvents () {
        var layerE =
            <form id="myForm" onSubmit={this.handleSubmit}>
                <table>
                    <tr><th><input value="&times;" className="buttonEvent" onClick={this.openCreateEvent} /></th>
                        <th>Новое событие</th>
                        <th><input value="&#10003;"  type="submit" className="buttonEvent" /></th></tr>
                    <tr id = "name-1" onClick={this.selectBlock}>
                        <td colspan = "3" >Название ивента: <p>
                            <input  ref="someName" id="idName" className="inputText" type="text" value={this.state.name}  placeholder="Name event"  onChange={this.handleNameChange}  />  </p></td></tr>
                    <tr onClick={this.selectBlock2} id = "name-3">
                        <td>Дата события: </td>
                        <td  colspan = "2"><input id="idDate" className="inputText" type="text" value={this.state.value} placeholder="DD.MM.YYYY" required pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" onChange={this.handleChange}  /></td></tr>
                    <tr onClick={this.selectBlock3} id = "name-4"><td>Время начала: </td>
                        <td  colspan = "2"><input id="idTime" className="inputText" type="time" value={this.state.time} placeholder="time event" onChange={this.handleTimeChange}  /></td> </tr>
                    <tr id = "name-5" onClick={this.selectBlock4}><td colspan="3">Детали: <p>
                        <input id="idBody" className="inputText" type="text" value={this.state.body} placeholder="description event" onChange={this.handleBodyChange}  /></p></td> </tr>
                </table>
            </form>
        return layerE
    }


    render () {
        return (
<div>
    <div id = "layerEvents">{this.layerEvents()}</div>
    <div id="Calendar">
        <div className="layerButtonAdd">{this.addBEvent()}</div>
        {this.myCalendar}
    </div>
</div>
        )
    }

}

export default App;

