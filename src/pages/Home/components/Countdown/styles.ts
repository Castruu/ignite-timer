import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  font-family: 'Roboto Mono', monospace;

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    border-radius: 8px;
    padding: 2rem 1rem;
  }
`

export const Separator = styled.div`
  overflow: hidden;
  width: 4rem;
  padding: 2rem 0;
  color: ${({ theme }) => theme['green-500']};

  display: flex;
  justify-content: center;
`
