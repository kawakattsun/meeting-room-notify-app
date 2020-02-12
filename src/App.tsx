import React, { useState, useEffect } from 'react';

const wssEndpoint = process.env.REACT_APP_WSS_ENDPOINT || ''

const App = () => {
  const [availability, setAvailability] = useState('off')
  
  useEffect(() => {
    const ws = new WebSocket(wssEndpoint)
    ws.onopen = (event) => {
      console.log('info: ws connected.')
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
      if (response.message === 'on' || response.message === 'off') {
        setAvailability(response.message)
      }
    }

    return () => {
      ws.close()
    };
  }, []);

  return (
    <div className={`meetingRoomNotification meetingRoomNotification-${availability}`}>
      <p>会議室 {availability === 'on' ? '使用中' : '空室'}</p>
    </div>
  );
}

export default App;
