import { HistoryContainer, HistoryList, Status } from './styles.ts'

export function History() {
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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>5 days ago</td>
              <td>
                <Status statusColor="yellow">Ongoing</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
