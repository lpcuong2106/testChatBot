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
  function onLoad(){
    Tabletop.init({
      key: '1pS_8eZI5A_Wx2S76bXDXAlA2T34nshhjKYgxJQJg8o8',
      callback: googleData => {
        console.log(googleData);
        setSchedule(googleData);
      },
      simpleSheet: true
    })

    // if (week_mod == 3) {
    //   message = message + "\nHôm nay cũng là thứ 4, 21h đi đá bóng nhé";
    // }
  }
  var today = new Date();
  // var theDay = Math.round(((today - first) / (1000 * 60 * 60 * 24)) + .5 , 0);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let message;
  if(shedule !== null) {
    var dayName = days[today.getDay()];
    let study_name = shedule[today.getDay() - 1];
    console.log(study_name);
    if (study_name == undefined) {
      message = "Opps!!!\nLát nữa cậu phải học môn có mã là "+ study_name[0] + " từ 18h đến 21h đấy nhé!!";
      message = message + "\nVui lòng update lại từ điển để mình có thể biết được tên môn";
    } else {
      for(let indexObject in study_name){
        message += "Hê lô mai phen :))\nLát nữa cậu phải học môn "+ study_name[indexObject] + " từ 18h đến 21h đấy nhé!!" + 'Tiết thứ:' + indexObject;
      }

    }
  } else {
    message = "Hôm nay cậu được nghỉ đấy (tunghoa)";
  }
  function send_to_facebook(textMessage) {
    var recipient_ids = ['100018778928523'];
    var API_TOKEN = 'EAAjgE3NNNdUBACMRKKF2YgI1qcONFDqotNESSwy3p3SPRA7Gxk3QXiNucPZAdi5sN4CcQOedZBdnLtEwyAd9x9weJ57TV7Uqo7KVUeuq7rJbnVgVYaXugtSZAqYS740yVzDMC6Dpfnc5B6fNRZBAlbnuu9yPk7JENyTvLa4XNlC5PBesGHwZChtI5MLmYAyhmuOZB7ZB92689NHhJqOFhRPVXQVDztpP9sZD';
    for (var j = 0; j < recipient_ids.length; j++) {
      var messageData = {
        "recipient": {
          "id": recipient_ids[j]
        },
        "message": {
          "text": textMessage
        }
      }
      var JSONdMessageData = {};
      for(var i in messageData){
        JSONdMessageData[i] = JSON.stringify(messageData[i])
      }
      var payload = JSONdMessageData;
      payload.access_token = API_TOKEN;
      var options = {
        "method": "post",
        "payload": payload,
      };
      axios.post("https://graph.facebook.com/v5.0/me/messages", options).then(res => {
        console.log(res);
      });
      // UrlFetchApp.fetch("https://graph.facebook.com/v5.0/me/messages", options);
    }
    console.log("Send Facebook ok");
  }
  send_to_facebook('hello work');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
