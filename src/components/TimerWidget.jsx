import { useState, useEffect } from 'react'

function TimerWidget() {
  const [time, setTime] = useState(new Date())
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let interval
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false)
      alert('⏰ Timer finished!')
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const handleStartTimer = () => {
    const sec = parseInt(input)
    if (sec > 0) {
      setSeconds(sec)
      setIsRunning(true)
      setInput('')
    }
  }

  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    const secs = sec % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Timer & Clock</h3>

      <div className="bg-green-700 rounded-lg p-4 text-center mb-4">
        <p className="text-gray-100 text-sm mb-2">Current Time</p>
        <p className="text-4xl font-bold font-mono">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </p>
        <p className="text-sm text-gray-100 mt-2">{time.toDateString()}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-100 mb-2">Countdown Timer</p>
        <p className="text-3xl font-bold font-mono text-center mb-4">{formatTime(seconds)}</p>

        {!isRunning && seconds === 0 ? (
          <div className="space-y-2">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Seconds"
              className="w-full bg-green-700 text-white px-3 py-2 rounded text-sm focus:outline-none border border-green-400"
            />
            <button
              onClick={handleStartTimer}
              className="w-full bg-white text-green-600 font-bold py-2 rounded hover:bg-gray-100 transition-all"
            >
              Start
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-full bg-white text-green-600 font-bold py-2 rounded hover:bg-gray-100 transition-all"
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
        )}
      </div>
    </div>
  )
}

export default TimerWidget
