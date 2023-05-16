import { CountdownContainer, Separator } from './styles.ts'
import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { useCyclesContext } from '../../../../contexts/CyclesContext.tsx'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    finishCurrentCycle,
    secondsSinceCycleStart,
    setPassedSeconds,
  } = useCyclesContext()

  const activeCycleMinutesAmount = activeCycle?.minutesAmount ?? 0
  const activeCycleSecondsAmount = activeCycleMinutesAmount * 60
  const activeCycleSecondsLeft = activeCycleSecondsAmount
    ? activeCycleSecondsAmount - secondsSinceCycleStart
    : 0
  const activeCycleMinutesLeft = Math.floor(activeCycleSecondsLeft / 60)

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        Date.now(),
        activeCycle.startDate,
      )

      if (secondsDifference >= activeCycleSecondsAmount) {
        finishCurrentCycle()
      } else {
        setPassedSeconds(secondsDifference)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, activeCycleId, finishCurrentCycle, setPassedSeconds])

  const minutes = String(activeCycleMinutesLeft).padStart(2, '0')
  const seconds = String(activeCycleSecondsLeft % 60).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) {
      document.title = 'Ignite Timer'
      return
    }
    document.title = `${minutes}:${seconds} - ${activeCycle.task}`
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
