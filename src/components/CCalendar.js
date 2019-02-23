import React, { Component } from 'react';
import  moment from 'moment'
import localization from 'moment/locale/ru'

import './style/CCalendar.css'

class CCalendar extends Component {
    constructor(props) {
        super(props);
        this.allMonth = true
        this.state = { // объект для хранения данных каледаря
            id: "",
            day: "",
            mday: "",
            month: "",
            year: "",
            week: "",
            nday: "",
            aday: [], // массив для хранения дней месяца
            events: this.props.data.sort((a,b) => moment(a.date, "DD.MM.YYYY") - moment(b.date, "DD.MM.YYYY")),
            selectevents: "",
        }
        this.nextMonth = this.nextMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nowMonth = this.nowMonth.bind(this)
        this.tmCalendar = this.tmCalendar.bind(this)
        this.twCalendar = this.twCalendar.bind(this)
        this.getId=this.getId.bind(this)
        this.nowMonth() // определение сегодняшней даты
    }

    shouldComponentUpdate(){
        this.state.events=this.props.data.sort((a,b) => moment(a.date, "DD.MM.YYYY") - moment(b.date, "DD.MM.YYYY"));
        return true;
    }

    activeMenu(){ // выдвигающееся меню
        var menuElem = document.getElementById('layer2');
        menuElem.classList.toggle('open');
    }

    cloneDate(){ // копируем актуальную дату
        this.pointDate = this.nowDate.clone()
    }

    nowDay(){ // обновляем отображение даты
        this.setState({day: this.nowDate.format('dddd')})
        this.setState({month: this.nowDate.format('MMMM')})
        this.setState({year: this.nowDate.format('YYYY')})
        this.setState({nday: this.nowDate.daysInMonth()})
}

    nowMonth(){ // сегодняшня дата
        moment().locale("ru", localization).format('LLL') // установка русского формата календаря
        this.nowDate = moment()
        if(this.allMonth==true) {
            this.nowDate.startOf("month")
        }
        this.nowDay()
    }

    tmCalendar(){ // Тип календаря месяц
            this.allMonth=true // на месяц
            this.nowDate.startOf("month")
        this.nowDay()
        this.activeMenu()
    }

    twCalendar(){ // Тип календаря неделя
        this.allMonth=false // на неделю
        if (this.nowDate.format("MM")==moment().format("MM")&&this.nowDate.format("YYYY")==moment().format("YYYY")){
            this.nowDate = moment()
        }
       this.cloneDate()
      this.pointDate.startOf("week")
       if(this.pointDate.format('MM.YYYY')==this.nowDate.format("MM.YYYY")){
           this.nowDate.startOf("week")
        }
        this.nowDay()
        this.activeMenu()
    }

    nextMonth(){ // показать след месяц/неделю
        if(this.allMonth===true) {
            this.nowDate.startOf("month")
            this.nowDate.month((this.nowDate.format('M'))) // +1 месяц
        }
        else{
            this.nowDate.startOf("week")
            this.nowDate.add(1, 'week');
        }
        this.nowDay()
        }

    previousMonth(){ //показать предедущий месяц/неделю
        if(this.allMonth===true) {
            this.nowDate.startOf("month")
            this.nowDate.month((this.nowDate.format('M'))-2) // -1 месяц

        }
        else{
            this.nowDate.startOf("week")
            this.nowDate.subtract(1, 'week')
        }
        this.nowDay()
    }

    renderStartM(){ //отображение дней (ячеек) не входящих в выбранный месяц
        var cal = []
        for (var i = 0; i < this.pointDate.weekday(); i++) {
            cal.push(<td onClick={this.getId}></td>)
        }
        return cal
    }

    getId(element) { // получить день выбранного ивента
         this.setState({selectevents:this.datePars(element.currentTarget.innerText)+"."+this.nowDate.format("MM")+"."+this.nowDate.format("YYYY")})
    }

    datePars(str){ // парсинг выбранного ивента
        var date = ""
        for(var i = 0; i<str.length; i++){
            if(Number(str.charAt(i))||str.charAt(i)=="0"){
                    date = date.concat(str.charAt(i))
            }
        }
        return date
    }

    renderDay() { //отображение дня
        for (var i = 0; i < this.state.events.length; i++) {//цикл по добавленным ивентам
            if (this.pointDate.format("DD.MM.YYYY") == moment().format("DD.MM.YYYY")) { // если день сегодняшний
                if(this.pointDate.format("DD.MM.YYYY")==this.state.events[i].date){ // если день содержит ивент
                    var cweek = <td onClick={this.getId}><div className="dayT">
                            <div className="point-day">&middot;</div>
                            <div>{this.pointDate.format("DD")}</div>
                            <div className="event-day">&mdash;</div>
                    </div></td>
                    return cweek
                }
                 else{
                    var cweek = <td><div className="dayT">
                            <div className="point-day">&middot;</div>
                            <div>{this.pointDate.format("DD")}</div>
                            <div className="event-day">&nbsp;</div>
                    </div></td>
                }
            }
            else {
                if(this.pointDate.format("DD.MM.YYYY")==this.state.events[i].date){ // если день содержит ивент
                    var cweek = <td onClick={this.getId}><div className="dayT">
                            <div className="point-day">&nbsp;</div>
                            <div>{this.pointDate.format("DD")}</div>
                            <div className="event-day">&mdash;</div>
                    </div></td>
                    return cweek
                }
                else{
                    var cweek = <td><div className="dayT">
                            <div className="point-day">&nbsp;</div>
                            <div>{this.pointDate.format("DD")}</div>
                            <div className="event-day">&nbsp;</div>
                    </div></td>
                }
            }
        }
        return cweek
    }

    renderMonth = () => { // отображение месяца / недели
       var  resultCalendar = [] // месяц
        var cweek = [] //неделя месяца
        var month = this.nowDate.format('MM')
        if(this.allMonth==true) { // если отображение месяца
          //  this.nowDate.startOf("month") // начало месяца
            cweek.push(this.renderStartM()) //отображение ячеек не входящий в месяц
            while (this.pointDate.format('MM') == month) {
                if (Number(this.pointDate.weekday()) == 6) { // вс - перевод строки
                    cweek.push(this.renderDay())
                     resultCalendar.push(<tr>{cweek}</tr>)
                    cweek = [] // очищаем массив
                }
                else {
                    cweek.push(this.renderDay())
                }
                this.pointDate.add(1, 'days');// плюс день (след день рендерига)
            }
             resultCalendar.push(<tr>{cweek}</tr>) //добавление недели
        }

        else{ // если выбрана неделя для отображения
            this.pointDate.startOf("week") // перевод на начало недели
            var week = this.pointDate.format('WW')
            cweek.push(this.renderStartM()) //отображение ячеек не входящий в месяц
            while (this.pointDate.format('WW') == week) {
                if (Number(this.pointDate.weekday()) == 6) { // вс, последний день - перевод строки
                    cweek.push(this.renderDay()) // добавление дней недели
                     resultCalendar.push(<tr>{cweek}</tr>) //добавление недели
                    cweek = [] // очищаем массив
                }
                else {
                    cweek.push(this.renderDay()) // добавление дней недели

                }
                this.pointDate.add(1, 'days');// плюс день (след день рендерига)
            }
             resultCalendar.push(<tr>{cweek}</tr>) // добавление недели
        }
        return  resultCalendar
        }

    renderEvent(){ // отображение таблицы с ивентами
        var eventCalendar = [] // массив для хранение данных таблицы
        var eventCalendar2 = [] // массив для хранение данных таблицы
        var size = ""
        var date = this.nowDate.clone()

        if(this.allMonth==true){
            size = "MM.YYYY"
        }
        else{
            size = "WW.YYYY"
        }
        for(var i = 0; i<this.state.events.length; i++) {// по количеству дней с ивентами

            if (moment(this.state.events[i].date, "DD.MM.YYYY").format(size) == date.format(size)) { // ивенты выбранного дипазона времени (месяц или неделя)
                if (this.state.events[i].date == this.state.selectevents) { // если ивент отмчеченый (selected) на календаря
                    eventCalendar2.push(<tr className="tr-1">
                        <td>{moment(this.state.events[i].date, "DD.MM.YYYY").format("dddd, DD MMMM")}</td>
                        <td>&nbsp;</td>
                    </tr>) // дата дня с ивентом

                }
                else {
                    eventCalendar.push(<tr className="tr-1">
                        <td>{moment(this.state.events[i].date, "DD.MM.YYYY").format("dddd, DD MMMM")}</td>
                        <td>&nbsp;</td>
                    </tr>) // дата дня с ивентом
                }
                for (var j = 0; j < this.state.events[i].events.length; j++) { // по кличеству ивентов в дне
                    if (this.state.events[i].date == this.state.selectevents) {
                        eventCalendar2.push(this.renderEventDay(this.state.events[i].events[j])) // отображение названия и времени ивента
                        eventCalendar2.push(this.renderEventDay2(this.state.events[i].events[j])) // отображение описания ивента
                    }
                    else {
                        eventCalendar.push(this.renderEventDay(this.state.events[i].events[j])) // отображение названия и времени ивента
                        eventCalendar.push(this.renderEventDay2(this.state.events[i].events[j])) // отображение описания ивента
                    }
                }
                if (this.state.events[i].date == this.state.selectevents) { // ивенты выбранного дипазона времени (месяц или неделя)
                    eventCalendar2.push(<tr className="tr-4">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>) //пропуск сроки
                }
                else {
                    eventCalendar.push(<tr className="tr-4">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>) //пропуск сроки
                }
            }
        }
        this.state.selectevents="" // очищаем данные о выбранном ивенте
        eventCalendar2.push(eventCalendar) // объединяем массив с ивентами, так чтобы отмеченный ивент был сверху
    return eventCalendar2
    }

    renderEventDay(event){ // отображение названия и времени ивента
        var result =
            <tr className="tr-2">
                <td>{event.name}</td>
                <td>{event.time}</td>
            </tr>
        return result
}

    renderEventDay2(event){ // отображение описания ивента
        var result =
            <tr className="tr-3">
                <td>{event.body}</td>
                <td></td>
            </tr>
        return result
    }

    rendernameWeek(){ // Отображение диапазона выбранных дат
        var secondCloneD = this.pointDate.clone()
        var secondCloneD2 = this.pointDate.clone()
        secondCloneD.endOf('week')
        secondCloneD2.startOf('week')
        if(secondCloneD.format("MM.YYYY")!=this.pointDate.format("MM.YYYY")||secondCloneD2.format("MM.YYYY")!=this.pointDate.format("MM.YYYY")){
         if (secondCloneD2.format("MM.YYYY")<this.pointDate.format("MM.YYYY")){ // предыдущий
                return secondCloneD2.format("MMMM") + " " + secondCloneD2.format("DD") +"-"+  secondCloneD.format("MMMM") + " " + secondCloneD.format("DD")
            }
            else { // след месяц
             return secondCloneD2.format("MMMM") + " " + secondCloneD2.format("DD") + "-" + secondCloneD.format("MMMM") + " " + secondCloneD.format("DD")
          }}
         else{ // даты равны
                return this.pointDate.format("MMMM") + " " + secondCloneD2.format("DD") +"-"+ secondCloneD.format("DD")
            }
        }

    render () {
        this.cloneDate()
        var headCalendar = <tr>
            <th>пн</th>
            <th>вт</th>
            <th>ср</th>
            <th>чт</th>
            <th>пт</th>
            <th>сб</th>
            <th>вс</th>
        </tr>

        var nextCalendar = <table className="tableNextCalendar">
                <tr>
                    <td className="td-left"><button className="button-1" onClick={this.previousMonth}>
                        <div>
                            { !this.allMonth && <div> prev </div> }
                            { this.allMonth && moment().month(Number(this.nowDate.format("MM"))-2).format("MMMM") }
                        </div>
                    </button></td>
                    <td className="td-top"><div id="layer2" ><button className="button-2" onClick={this.nowMonth}>
                        <div className="rangeDate">
                            { !this.allMonth && this.rendernameWeek() }
                            { this.allMonth && this.pointDate.format("MMMM") }
                        </div>
                        </button>
                        <a  className="title" onClick={this.activeMenu}></a>
                            <table>
                                <tr align="center">
                                    <td><button className="button-3" onClick={this.twCalendar}>
                                        Неделя
                                    </button></td>
                                    <td><button className="button-3" onClick={this.tmCalendar}>
                                        Месяц
                                    </button></td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td className="td-right"><button className="button-1" onClick={this.nextMonth}>
                        <div>
                            { !this.allMonth && <div> next </div> }
                            { this.allMonth && moment().month(Number(this.nowDate.format("MM"))).format("MMMM") }
                        </div>
                    </button></td>
                </tr>
            </table>

    var monthCalendar =   <table className="tableCalendar"><tbody>
        {headCalendar}
        {this.renderMonth()}
        <h3></h3>
        </tbody>
        </table>
        var tableEvent =  <table className="tableEvent">{this.renderEvent()}</table>
        return (

            <div id="layer1">
                {nextCalendar}
                {monthCalendar}
                {tableEvent}
            </div>
        )
    }
}
export default CCalendar;

