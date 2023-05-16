import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles.ts'
import { HandPalm, Play } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useCyclesContext } from '../../contexts/CyclesContext.tsx'

const newCycleFormSchemaValidation = zod.object({
  task: zod.string().nonempty(),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchemaValidation>

export function Home() {
  const { activeCycle, interruptCurrentCycle, createCycle } = useCyclesContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function onSubmit(data: NewCycleFormData) {
    createCycle(data)

    reset()
  }

  function handleCycleInterruption() {
    interruptCurrentCycle()
  }

  const task = watch('task')
  const isSubmitEnabled = !!task.trim()

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
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
