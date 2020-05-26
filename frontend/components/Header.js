import { APP_NAME } from '../config'

import { useState, useContext } from 'react'
import { UI_context } from '../context/UI/context.ui'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { signout, isAuth } from '../actions/auth'

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

const Header = (props) => {
	const { dispatch } = useContext(UI_context)

	const router = useRouter()
	const isAuthenticated = isAuth()

	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const linksIn = [
		{ href: '/signin', label: 'Signin' },
		{ href: '/signup', label: 'Signup' },
	].map(({ href, label }, index) => (
		<NavItem key={`${href}-$`}>
			<CustomLink href={href}>{label}</CustomLink>
		</NavItem>
	))

	const linksOut = (
		<NavItem>
			<NavLink
				onClick={() => {
					signout(() => {}).then((data) => {
						if (data.error) {
							dispatch({
								type: 'snackbar_on',
								payload: { color: 'warning', message: data.error, timeout: 5000 },
							})
						} else {
							dispatch({
								type: 'snackbar_on',
								payload: {
									color: 'success',
									message: data.message,
									link: data.link,
									timeout: 3000,
								},
							})
						}
						router.replace('/signin')
					})
				}}
			>
				Signout
			</NavLink>
		</NavItem>
	)

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>
					<Link href='/' >
						<span style={{ cursor: 'pointer' }}>{APP_NAME}</span>
					</Link>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						{isAuthenticated ? linksOut : linksIn}
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
