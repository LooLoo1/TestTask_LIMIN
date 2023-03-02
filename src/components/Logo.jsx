import React from 'react'
import { Link } from "react-router-dom";

import logo from "../logo.svg";

const Logo = () => {
  return (
	<Link to="/">
		<img className='logo' src={logo} alt="Logo"/>
	</Link>
  )
}

export default Logo