import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import useSound from 'use-sound';
export default function Component() {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(13)
  const [shortSound] = useSound("short.mp3");
  const [longSound] = useSound("long.mp3");
  const [finishSound] = useSound("finish.mp3");
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])
  useEffect(() => {
    if (timeRemaining === 0) {
      setIsRunning(false)
      setP1Disabled(true)
      setP2Disabled(true)
      setTimeRemaining(time)
    }
    if (timeRemaining === 10) {
      longSound()
    }
    if (timeRemaining < 4) {
      if (timeRemaining === 0) {
        finishSound()
      } else {
        shortSound()
      }

    }
    setProgress((timeRemaining / time) * 100)
  }, [time, timeRemaining])
  const handleStart = () => {
    setIsRunning(true)
    setP1Disabled(false)
    setP2Disabled(false)
  }
  const handlePause = () => {
    setIsRunning(false)
  }
  const handleReset = () => {
    setTimeRemaining(time)
    setP1Disabled(false)
    setP2Disabled(false)
    setIsRunning(false)
  }
  const [p1disabled, setP1Disabled] = useState(true)
  const [p2disabled, setP2Disabled] = useState(true)
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center font-bold text-6xl tracking-tight lg:text-[4rem]">
          Ultimate Pool
        </h1>
        {time === 0 ? <div className="border grid grid-cols-1 gap-4 justify-between">
          <Button className="w-full mt-4" onClick={() => { setTimeRemaining(15); setTime(15) }}> 15 Second Shot Clock </Button>
          <Button className="w-full mt-2" onClick={() => { setTimeRemaining(20); setTime(20) }}> 20 Second Shot Clock </Button>
          <Button className="w-full mt-2" onClick={() => { setTimeRemaining(30); setTime(30) }}> 30 Second Shot Clock </Button>
          <Button className="w-full my-2" onClick={() => { setTimeRemaining(45); setTime(45) }}> 45 Second Shot Clock </Button>
          <Button className="w-full mb-4" onClick={() => { setTimeRemaining(60); setTime(60) }}> 60 Second Shot Clock </Button>
        </div> : <Counter />}
      </div>
    </div >
  )
  function Counter() {
    return <div className="bg-background rounded-lg border p-6 w-full max-w-md flex flex-col items-center gap-4">
      <div className="text-4xl font-bold text-primary">{timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}</div>
      <Progress value={progress} />
      <div className="flex gap-2">
        <Button variant={isRunning ? "secondary" : "default"} onClick={isRunning ? handlePause : handleStart}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={p1disabled} onClick={() => { if (timeRemaining !== time) { setP1Disabled(true); setTimeRemaining(timeRemaining + 15) } }}>
          P1 Ext
        </Button>
        <Button variant="secondary" disabled={p2disabled} onClick={() => { if (timeRemaining !== time) { setP2Disabled(true); setTimeRemaining(timeRemaining + 15) } }}>
          P2 Ext
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => { handleReset(); setTime(0) }}>
          Switch
        </Button>
      </div>
    </div >
  }
}