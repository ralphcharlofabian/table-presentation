import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { Switch } from 'antd';
import 'antd/dist/antd.css';

import Presentation from './Presentation'

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

const App = ({}) => {
  const [rrbfData, setDataRrbf] = useState([]);
  const [callPutData, setDataCallPut] = useState([]);
  const [selectedTable, setSelectedTable] = useState('rrbf');


  const onSwitchTable = () => {
    if (selectedTable === 'rrbf') {
      setSelectedTable('callput')
    } else {
      setSelectedTable('rrbf')
    }
  }
  // 1. listen for a event and update the state
  useEffect(() => {
    socket.on('rrbf', newValue => {
      setDataRrbf(currentData => [...currentData, newValue]);
    });
    socket.on('callPut', newValue => {
      setDataCallPut(currentData => [...currentData, newValue]);
    });
  }, []);



  // 2. render the chart using the state
  return (
    <div style={{marginLeft:30, marginRight:30}}>
      <h1>Table Presentation</h1>
      <Switch
      checkedChildren="RR/BF table"
      unCheckedChildren="CALL/PUT table"
      defaultChecked
      onChange={onSwitchTable}
    />

    {selectedTable ==='rrbf' ? 
      <>
        <Presentation data ={rrbfData}/>
      </> : 
      <>
        <Presentation data ={callPutData}/>
      </>}      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
