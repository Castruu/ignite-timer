import { HistoryContainer, HistoryList, Status } from './styles.ts'
import { useCyclesContext } from '../../contexts/CyclesContext.tsx'
import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { cycles, activeCycleId } = useCyclesContext()

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.id === activeCycleId && (
                    <Status statusColor="yellow">Ongoing</Status>
                  )}
                  {!!cycle.finishedDate && (
                    <Status statusColor="green">Done</Status>
                  )}
                  {!!cycle.interruptionDate && (
                    <Status statusColor="red">Interrupted</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
