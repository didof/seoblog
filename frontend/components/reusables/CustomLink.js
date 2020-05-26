import React from 'react'

import { useRouter } from 'next/router'

import { NavLink } from 'reactstrap'

function CustomLink({ href, children }) {
	const router = useRouter()

	const style = {
		cursor: 'pointer',
		fontWeight: router.pathname === href ? 'bold' : 'inherit',
		color: router.pathname === href ? 'skyblue' : 'inherit',
	}

	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<NavLink style={style} onClick={handleClick}>
			{children}
		</NavLink>
	)
}

export default CustomLink
