import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer.ts'
import {
  createCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions.ts'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsSinceCycleStarted: number
  finishCurrentCycle: () => void
  setPassedSeconds: (seconds: number) => void
  createCycle: (cycle: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const cyclesStateJson = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (!cyclesStateJson) return initialState

      return JSON.parse(cyclesStateJson)
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsSinceCycleStarted, setSecondsSinceCycleStart] = useState(() => {
    if (!activeCycle) return 0

    return differenceInSeconds(Date.now(), new Date(activeCycle.startDate))
  })

  useEffect(() => {
    const cycleStateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cycleStateJson)
  }, [cyclesState])

  const createCycle = (data: CreateCycleData) => {
    const now = Date.now()
    const id = String(now)

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: now,
    }

    dispatch(createCycleAction(newCycle))
    setSecondsSinceCycleStart(0)
  }

  const setPassedSeconds = (seconds: number) => {
    setSecondsSinceCycleStart(seconds)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
    setSecondsSinceCycleStart(0)
  }

  const finishCurrentCycle = () => {
    dispatch(finishCurrentCycleAction())
    setSecondsSinceCycleStart(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        finishCurrentCycle,
        secondsSinceCycleStarted,
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
