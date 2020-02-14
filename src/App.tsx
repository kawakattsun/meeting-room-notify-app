import React, { useState, useEffect } from 'react';

const wssEndpoint = process.env.REACT_APP_WSS_ENDPOINT || ''

const App = () => {
  const [availability, setAvailability] = useState('loading')
  
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

  const infomation = () => {
    if (availability === 'loading') {
      return 'Loading...'
    }
    return availability === 'on' ? '使用中' : '空室'
  }

  return (
    <div className={`meetingRoomNotification meetingRoomNotification-${availability}`}>
      <h1>会議室 β</h1>
      <p>{infomation()}</p>
    </div>
  );
}

export default App;
