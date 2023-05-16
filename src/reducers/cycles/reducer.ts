import { CyclesActionTypes } from './actions.ts'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: number
  interruptionDate?: number
  finishedDate?: number
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case CyclesActionTypes.CREATE_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case CyclesActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const cycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (cycleIndex === -1) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[cycleIndex].interruptionDate = Date.now()
        draft.activeCycleId = null
      })
    }
    case CyclesActionTypes.FINISH_CURRENT_CYCLE: {
      const cycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (cycleIndex === -1) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[cycleIndex].finishedDate = Date.now()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
