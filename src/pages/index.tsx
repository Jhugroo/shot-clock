import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
export default function Component() {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(13)
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
    }
    setProgress((timeRemaining / time) * 100)
  }, [timeRemaining])
  const handleStart = () => {
    setIsRunning(true)
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
  const [p1disabled, setP1Disabled] = useState(false)
  const [p2disabled, setP2Disabled] = useState(false)
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
          Ultimate Pool
        </h1>
        {time === 0 ? <div className="border grid grid-cols-1 gap-4 justify-between">
          <Button variant="default" className="w-full mt-4" onClick={() => { setTimeRemaining(30); setTime(30) }}> 30 sec </Button>
          <Button variant="default" className="w-full mt-2" onClick={() => { setTimeRemaining(45); setTime(45) }}> 45 sec </Button>
          <Button variant="default" className="w-full mb-4 mt-2" onClick={() => { setTimeRemaining(60); setTime(60) }}> 60 sec </Button>
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
        <Button variant="secondary" disabled={p1disabled} onClick={() => { setP1Disabled(true); setTimeRemaining(timeRemaining + 15) }}>
          P1 Ext
        </Button>
        <Button variant="secondary" disabled={p2disabled} onClick={() => { setP2Disabled(true); setTimeRemaining(timeRemaining + 15) }}>
          P2 Ext
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => { handleReset(); setTime(0) }}>
          Switch
        </Button>
      </div>
    </div>
  }
}