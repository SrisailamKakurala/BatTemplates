import React from 'react'
import logo from '@/assets/images/logo.png'
import logomobile from '@/assets/images/logomobile.png'
import { NavLink } from "react-router-dom";

type ImageProps = {
    classNames?: string,
    to?: string
}

const Logo: React.FC<ImageProps> = ({ classNames, to }) => {
  return (
    <NavLink to={to || '/'}>
        <img src={logo} className={classNames} />
    </NavLink>
  )
}

export const LogoMobile: React.FC<ImageProps> = ({ classNames, to }) => {
  return (
    <NavLink to={to || '/'}>
        <img src={logomobile} className={classNames} />
    </NavLink>
  )
}

export default Logo
