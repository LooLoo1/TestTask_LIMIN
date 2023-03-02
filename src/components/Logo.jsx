import React from 'react'
import logo from "../logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
	<Link to="/">
		<img className='logo' src={logo} alt="Logo"/>
	</Link>
  )
}

export default Logo