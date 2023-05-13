import { HeaderContainer } from './styles.ts'
import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom';
import { Scroll, Timer } from '@phosphor-icons/react';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
