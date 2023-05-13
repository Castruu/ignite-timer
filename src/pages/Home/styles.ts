import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: 700;
  font-size: 1.125rem;
  gap: 0.5rem;
`

const BaseInput = styled.input`
  height: 2.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: 700;
  font-size: 1.125rem;
  outline: none;
  border: 0;
  background-color: transparent;
  padding: 0 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme['gray-700']};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`

export const TimerInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

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

export const StartCountdownButton = styled.button`
  border: none;
  outline: none;
  border-radius: 8px;

  color: ${({ theme }) => theme['gray-100']};
  font-weight: 700;
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  background-color: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
