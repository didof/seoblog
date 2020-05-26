import React, { useEffect, useContext } from 'react'
import { UI_context } from '../../context/UI/context.ui'
import { useRouter } from 'next/router'

import { isAuth } from '../../actions/auth'

function AdminGuard({ children }) {
	const router = useRouter()

	const { dispatch } = useContext(UI_context)

	useEffect(() => {
		let user = isAuth()
		if (!user) {
			router.push('/signin')
		} else if (user.role !== 1) {
			router.push('/user')
			dispatch({
				type: 'snackbar_on',
				payload: {
					color: 'info',
					message: 'That resource is reserved to admins only',
					timeout: 3000,
				},
			})
		}
	}, [])

	return <React.Fragment>{children}</React.Fragment>
}

export default AdminGuard
