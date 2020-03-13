import React, { useState, useEffect } from 'react'

const wssEndpoint = process.env.REACT_APP_WSS_ENDPOINT_MEETING_ROOM || ''

const MeetingRoom = () => {
  const [availability, setAvailability] = useState('loading')

  useEffect(() => {
    const init = () => {
      const ws = new WebSocket(wssEndpoint)
      ws.onopen = () => {
        console.log('info: ws connected.')
      }
      ws.onmessage = event => {
        const response = JSON.parse(event.data)
        if (response.message === 'on' || response.message === 'off') {
          setAvailability(response.message)
        }
      }
      ws.onclose = event => {
        console.log('info: ws closed. code:' + event.code)
        setTimeout(() => {
          client = init()
        }, 3000)
      }
      return ws
    }
    let client = init()

    return () => {
      client.close()
    }
  }, [])

  const infomation = () => {
    if (availability === 'loading') {
      return 'Loading...'
    }
    return availability === 'on' ? '使用中' : '空室'
  }

  return (
    <div
      className={`meetingRoomNotification meetingRoomNotification-${availability}`}
    >
      <h1>会議室</h1>
      <p>{infomation()}</p>
    </div>
  )
}

export default MeetingRoom
