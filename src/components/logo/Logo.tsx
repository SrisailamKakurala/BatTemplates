import React from 'react'
import logo from '@/assets/images/logo.png'
import { NavLink } from "react-router-dom";

type ImageProps = {
    classNames: string
}

const Logo: React.FC<ImageProps> = ({ classNames }) => {
  return (
    <NavLink to="/">
        <img src={logo} className={classNames} />
    </NavLink>
  )
}

export default Logo
