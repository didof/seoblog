import { APP_NAME } from '../config'

import { useState } from 'react'

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	NavbarText,
} from 'reactstrap'

import CustomLink from './reusables/Link'
import Link from 'next/link'

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const links = [
		{ href: '/signin', label: 'Signin' },
		{ href: '/signup', label: 'Signup' },
	].map(({ href, label }, index) => (
		<NavItem key={`${href}-$`}>
			<CustomLink href={href}>{label}</CustomLink>
		</NavItem>
	))

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>
					<Link href='/'>
						<spa>{APP_NAME}</spa>
					</Link>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						{links}
						<NavItem>
							<NavLink href='https://github.com/didof'>GitHub</NavLink>
						</NavItem>
					</Nav>
					<NavbarText>Simple Text</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	)
}

export default Header
