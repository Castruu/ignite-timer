/* eslint-disable */
import { Cycle } from './reducer.ts';

export enum CyclesActionTypes {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}
/* eslint-enable */

export const createCycleAction = (newCycle: Cycle) => ({
  type: CyclesActionTypes.CREATE_CYCLE,
  payload: {
    newCycle,
  },
})

export const finishCurrentCycleAction = () => ({
  type: CyclesActionTypes.FINISH_CURRENT_CYCLE,
})

export const interruptCurrentCycleAction = () => ({
  type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE,
})
