import React, { Component } from 'react';
import  moment from 'moment'
import localization from 'moment/locale/ru'

import './style/CCalendar.css'

class CCalendar extends Component {
    constructor() {
        super();
        this.allMonth = true
        this.state = { // объект для хранения данных каледаря
            id: "",
            day: "",
            month: "",
            year: "",
            week: "",
            nday: "",
            aday: [] // массив для хранения дней месяца
        }

        this.nextMonth = this.nextMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nowMonth = this.nowMonth.bind(this)
        this.sizeCalendar = this.sizeCalendar.bind(this)
        this.nowMonth() // определение сегодняшней даты
    }

    nowMonth(){
        moment().locale("ru", localization).format('LLL') // установка русского формата календаря
        this.nowDate = moment()
        this.setState({aday: this.generateDate(this.dataCalendar())})
        this.setState({day: this.nowDate.format('dddd')})
        this.setState({month: this.nowDate.format('MMMM')})
        this.setState({year: this.nowDate.format('YYYY')})
        this.setState({nday: this.nowDate.daysInMonth()})
    }

    sizeCalendar(){ // Тип календаря
        if(this.allMonth===true){
            this.allMonth=false // на неделю
        }
        else{
            this.allMonth=true // на месяц
        }
        this.setState({day: this.nowDate.format('dddd')})
        this.setState({month: this.nowDate.format('MMMM')})
        this.setState({year: this.nowDate.format('YYYY')})
        this.setState({nday: this.nowDate.daysInMonth()})
    }

    nextMonth(){
        if(this.allMonth===true) {
            this.nowDate.month((this.nowDate.format('M'))) // +1 месяц
        }
        else{
            this.nowDate.week(Number(this.nowDate.format('W'))+1) // +1 неделя
        }
        this.setState({aday: this.generateDate(this.dataCalendar())})
        this.setState({day: this.nowDate.format('dddd')})
        this.setState({month: this.nowDate.format('MMMM')})
        this.setState({year: this.nowDate.format('YYYY')})
        this.setState({nday: this.nowDate.daysInMonth()})
    }

    previousMonth(){
        if(this.allMonth===true) {
            this.nowDate.month((this.nowDate.format('M'))-2) // -1 месяц
        }
        else{
            this.nowDate.week(Number(this.nowDate.format('W'))-1) // -1 неделя
        }
        this.setState({aday: this.generateDate(this.dataCalendar())})
        this.setState({day: this.nowDate.format('dddd')})
        this.setState({month: this.nowDate.format('MMMM')})
        this.setState({year: this.nowDate.format('YYYY')})
        this.setState({nday: this.nowDate.daysInMonth()})
    }

    dataCalendar(){ // Определяем начало заполнения календаря в таблице (отступ)
        var daysIndent = 0
        var newCalendar = moment([ this.nowDate.year(), this.nowDate.month(), 1]) //определяем дни недели в заданом месяце
        switch (newCalendar.format('dddd')){
            case 'понедельник':
                daysIndent = 0;
                break;
            case 'вторник':
                daysIndent = 1;
                break;
            case 'среда':
                daysIndent = 2;
                break;
            case 'четверг':
                daysIndent = 3;
                break;
            case 'пятница':
                daysIndent = 4;
                break;
            case 'суббота':
                daysIndent = 5;
                break;
            case 'воскресенье':
                daysIndent = 6;
                break;
        }
        return daysIndent; // Отступ начала надели в календаря
}

    generateDate(pass = 0, notes = []){ // генерируем данные месяца для календаря
        // (функция получет число отступа начала заполения таблицы и данные о событиях)
        var arrayCalendar = [] // массив с для данных каледаря на месяц
        var k = 1 // день месяца
        for (var i = 0; i<= this.nowDate.daysInMonth()+10; i++){
            if (i<pass){
                arrayCalendar.push({id: i, text: '  '}) // дни вне актуального месяца
            }
            else if(i>=this.nowDate.daysInMonth()+pass){
                arrayCalendar.push({id: i, text: ''})
            }
            else {
                if(k<10) {
                    var gdate = '0' + k + '.' + this.nowDate.format('MM.YYYY') // день итерации
                }
                else{
                    var gdate = k + '.' + this.nowDate.format('MM.YYYY') // день итерации
                }
                for (var j = 0; j < notes.length; j++) {
                    if (gdate !== notes[j].date) { // если совпадений нету
                        if(j===notes.length-1) { // если номер итерации равен концу размера массива
                            arrayCalendar.push({id: i, text: k, event: ''})
                        }
                    }
                    else {
                        arrayCalendar.push({id: i, text: k, event: 'yes'})
                        break
                    }
                }
                k++ // день месяца
            }
        }
        return arrayCalendar
        }



    renderDay = day => { // отображение дня месяца
        var day2 = day['text'] // число дня месяца
        if(day2==moment().format("DD")&& this.nowDate.format('MM.YYYY')== moment().format('MM.YYYY')){ // если да - выделяем сегодняший день точкой
            if(day['event']==='yes'){ // если да - выделяем выделяем день с событием цветом
                return <td className='td-3'><div className='point-day'>&deg;</div>{day2}</td>
            }
            else {
                return <td className='td-2'><div className='point-day'>&deg;</div>{day2}</td>
            }
        }
        else{
            if(day['event']==='yes') { // если да - выделяем выделяем день с событием цветом
                return <td className='td-4'>{day2}</td>
            }
            else{
                if(day2!='') {
                    return <td className='td-1'>{day2}</td>
                }
            }
        }
}

    renderWeek = (path) => {
        var myWeek = this.state.aday.filter(function(elem){
            return elem['id'] < path && elem['id'] >= path-7; }) // берем дни понедельно
        var resultWeek = myWeek.map(day =>
            this.renderDay(day)) //отправляем день недели для рендеринга
        return resultWeek // возвращаем дни недели
        }

    renderMonth = () => {
        var week = undefined // данные недели
        var arrayWeek = [] // массив для хранения недель
            if(this.allMonth===true) { // если включено отображения календаря в виде месяца
                for (var i = 7; i < 43; i = i + 7) { // цикл для прохода по всем неделям месяца
                    week = this.renderWeek(i)
                    arrayWeek.push(<tr>{week}</tr>)
                }
            }
            else{
                if(this.nowDate.format("DD")<7){
                    week = this.renderWeek(7)
                    arrayWeek.push(<tr>{week}</tr>)
                }
                else if(this.nowDate.format("DD")<14){
                    week = this.renderWeek(14)
                    arrayWeek.push(<tr>{week}</tr>)
                }
                else if(this.nowDate.format("DD")<21){
                    week = this.renderWeek(21)
                    arrayWeek.push(<tr>{week}</tr>)
                }
                else if(this.nowDate.format("DD")<28){
                    week = this.renderWeek(28)
                    arrayWeek.push(<tr>{week}</tr>)
                }
                else if(this.nowDate.format("DD")<35){
                    var week = this.renderWeek(35)
                    arrayWeek.push(<tr>{week}</tr>)
                }
                else if(this.nowDate.format("DD")<43){
                    week = this.renderWeek(43)
                    arrayWeek.push(<tr>{week}</tr>)
                }
            }
        return arrayWeek // возвращение массива с неделями месяца
}

    render () {
        this.state.aday = this.generateDate(this.dataCalendar(), this.props.data)
        var headCalendar = <tr>
            <th>пн</th>
            <th>вт</th>
            <th>ср</th>
            <th>чт</th>
            <th>пт</th>
            <th>сб</th>
            <th>вс</th>
        </tr>

    var monthCalendar = <table className="tableCalendar">
        <tbody>
        {headCalendar}

            {this.renderMonth()}
        </tbody>
        </table>
        var controlCalendar = <table className="tableControlCalendar">
            <tbody>
            <tr>
                <td className="td-control"><button className="button-1"  onClick={this.previousMonth}>
                    Previes
                </button></td>
                <td className="td-control"><button className="button-1" onClick={this.nowMonth}>
                    Now
                </button></td>
                <td className="td-control"><button className="button-1" onClick={this.nextMonth}>
                    Next
                </button></td>
                <td className="td-control"><button className="button-1" onClick={this.sizeCalendar}>
                    Type calendar
                </button></td>
            </tr>
            </tbody>
        </table>



        return (
            <div>
                <h3>Table calendar:</h3>
                {monthCalendar}
                {controlCalendar}
                <p>День: {this.state.day}</p>
                <p>Месяц: {this.state.month}</p>
                <p>Год: {this.state.year}</p>
                <p>Количество дней в месяце: {this.state.nday}</p>
            </div>
        )
    }
}

export default CCalendar;

