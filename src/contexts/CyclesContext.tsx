import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: number
  interruptionDate?: number
  finishedDate?: number
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsSinceCycleStart: number
  finishCurrentCycle: () => void
  setPassedSeconds: (seconds: number) => void
  createCycle: (cycle: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsSinceCycleStart, setSecondsSinceCycleStart] = useState(0)

  const createCycle = (data: CreateCycleData) => {
    const now = Date.now()
    const id = String(now)

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: now,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsSinceCycleStart(0)
  }

  const setPassedSeconds = (seconds: number) => {
    setSecondsSinceCycleStart(seconds)
  }

  const interruptCurrentCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptionDate: Date.now(),
          }
        }

        return cycle
      }),
    )
    setActiveCycleId(null)
    setSecondsSinceCycleStart(0)
  }

  const finishCurrentCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: Date.now(),
          }
        }

        return cycle
      }),
    )
    setActiveCycleId(null)
    setSecondsSinceCycleStart(0)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        finishCurrentCycle,
        secondsSinceCycleStart,
        setPassedSeconds,
        createCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export const useCyclesContext = () => useContext(CyclesContext)
