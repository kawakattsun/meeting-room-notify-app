import React, { useState, useEffect } from 'react'

const wssEndpoint = process.env.REACT_APP_WSS_ENDPOINT_PERSON_CEO || ''
const personName = process.env.REACT_APP_PERSON_CEO_NAME || ''

const PersonCEO = () => {
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
    return availability === 'on' ? '在席中' : '離席中'
  }

  return (
    <div
      className={`meetingRoomNotification meetingRoomNotification-${availability}`}
    >
      <h1>{personName}社長</h1>
      <p>{infomation()}</p>
    </div>
  )
}

export default PersonCEO
