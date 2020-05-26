import React from 'react'

import AuthGuard from '../../components/auth/AuthGuard'

const UserIndex = () => {

	return (
		<AuthGuard>
         User Dashboard
		</AuthGuard>
	)
}

export default UserIndex