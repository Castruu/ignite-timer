import styled from 'styled-components'

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
