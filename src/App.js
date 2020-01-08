import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Tabletop from 'tabletop';
import axios from 'axios';


function App() {

    let [shedule, setSchedule] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        Tabletop.init({
            key: '1pS_8eZI5A_Wx2S76bXDXAlA2T34nshhjKYgxJQJg8o8',
            callback: googleData => {
                console.log(googleData);
                setSchedule(googleData);
            },
            simpleSheet: true
        })

    }
    let ListObject = {
      CT242: 'Kiến trúc và Thiết kế phần mềm. Tại phòng 303/DB',
      KL001: 'Pháp luật đại cương. Tại phòng 206/B1',
      CT174: 'Phân tích và thiết kế thuật toán. Tại phòng 201/C1',
      CT182: 'Ngôn ngữ mô hình hóa. Tại phòng LT3/DI',
      CT181: 'Hệ thống thông tin doanh nghiệp. Tại phòng LT3/DI',
      CT183: 'Anh văn chuyên môn công nghệ thông tin 1. Tại phòng HTR/DB',
      CT180: 'Cơ sở dữ liệu. Tại phòng 207/KH',
    }
    var today = new Date();
    var days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    let message = '';
    if (shedule !== null) {
        var dayName = days[today.getDay()];
        message += 'Hello Cuong so cute! Hôm nay là ' + dayName + " " + today.getDate() + '-' + today.getMonth() +1 + "-" + today.getFullYear() + " Lúc: "+ today.getHours() + ":"+today.getMinutes();
        message += '\nHôm nay bạn phải học các môn sau đây:\n';
        message += '<pre><code class="language-python">';
        let ScheduleToday = shedule[today.getDay() - 1];
        console.log(ScheduleToday);
        if (ScheduleToday === undefined) {
            message += "\nVui lòng update lại từ điển để mình có thể biết được lịch học hôm nay của bạn\n";
        } else {
            for (let i_mySubjectToday in ScheduleToday) {
              if(ScheduleToday[i_mySubjectToday] !== 'null'){
               let CodeOfSubject = ScheduleToday[i_mySubjectToday];
                message += 'Tiết thứ ' + i_mySubjectToday + ": HP " + CodeOfSubject +  " Môn: "+ ListObject[CodeOfSubject] +"\n";
              }

            }

        }
      message += '</code></pre>';
      message += "Bạn có thể xem toàn bộ lịch <a href='https://docs.google.com/spreadsheets/d/1pS_8eZI5A_Wx2S76bXDXAlA2T34nshhjKYgxJQJg8o8/edit#gid=1645683997'>ở đây</a>";

    }
    console.log(message);

    function send_to_telegram(textMessage) {
        var payload = {
            "method": "sendMessage",
            "chat_id": -390138423,
            "text": textMessage,
            "parse_mode": "HTML"
        }

        var API_TOKEN = '880407226:AAH-_JyUkP154P9PkUxnwBFHHHoV4b9QbFU';
        axios({
            method: 'POST',
            url: 'https://api.telegram.org/bot' + API_TOKEN + '/',
            data: payload,
        });
        console.log("Send Telegram ok");
    }

    // send_to_telegram(message);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
