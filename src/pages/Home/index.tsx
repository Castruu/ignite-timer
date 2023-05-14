import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  MinutesAmountInput,
  TimerInput,
  StopCountdownButton,
} from './styles.ts'
import { HandPalm, Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormSchemaValidation = zod.object({
  task: zod.string().nonempty(),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchemaValidation>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: number
  interruptionDate?: number
  finishedDate?: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsSinceCycleStart, setSecondsSinceCycleStart] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const onSubmit = (data: NewCycleFormData) => {
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

    reset()
  }

  const handleCycleInterruption = () => {
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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
      } else {
        setSecondsSinceCycleStart(secondsDifference)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, activeCycleId])

  const minutes = String(activeCycleMinutesLeft).padStart(2, '0')
  const seconds = String(activeCycleSecondsLeft % 60).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) {
      document.title = 'Ignite Timer'
      return
    }
    document.title = `${minutes}:${seconds} - ${activeCycle.task}`
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitEnabled = !!task.trim()

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <label htmlFor="task">I will be working on</label>
          <TimerInput
            id="task"
            type="text"
            placeholder="Give a name to your project"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Project 4" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleCycleInterruption} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!isSubmitEnabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
