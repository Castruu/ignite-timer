import { FormContainer, MinutesAmountInput, TimerInput } from './styles.ts'
import { useFormContext } from 'react-hook-form'
import { useCyclesContext } from '../../../../contexts/CyclesContext.tsx'

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I will be working on</label>
      <TimerInput
        id="task"
        type="text"
        placeholder="Give a name to your project"
        list="task-suggestions"
        disabled={!!activeCycle}
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
  )
}
