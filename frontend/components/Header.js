import { APP_NAME } from '../config'

import { useState, useContext } from 'react'
import { UI_context } from '../context/UI/context.ui'

import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import CustomLink from './reusables/Link'

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

const Header = (props) => {
	const { dispatch } = useContext(UI_context)

	const router = useRouter()

	const user = isAuth()

	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const guestLinks = [
		{ href: '/signin', label: 'Signin' },
		{ href: '/signup', label: 'Signup' },
	].map(({ href, label }, index) => (
		<NavItem key={`${href}-$`}>
			<CustomLink href={href}>{label}</CustomLink>
		</NavItem>
	))

	const userLinks = (
		<React.Fragment>
			{user && (
				<NavItem>
					<Link href={user.role === 1 ? '/admin' : '/user'}>
						<NavLink>{user.name}'s dashboard</NavLink>
					</Link>
				</NavItem>
			)}
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
		</React.Fragment>
	)

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>
					<Link href='/'>
						<span style={{ cursor: 'pointer' }}>{APP_NAME}</span>
					</Link>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='https://github.com/didof'>GitHub</NavLink>
						</NavItem>
					</Nav>
					<Nav className='ml-auto' navbar>
						{user ? userLinks : guestLinks}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	)
}

export default Header
