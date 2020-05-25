import React, { useContext } from 'react'
import { UI_context } from '../../context/UI/context.ui'

import { useRouter } from 'next/router'

import { Alert } from 'reactstrap'

function Snackbar() {
	const { state, dispatch } = useContext(UI_context)
	const { isOpen, color, text, link, timeout } = state.snackbar

	const router = useRouter()

	if (timeout) {
		window.setTimeout(() => {
			dispatch({ type: 'snackbar_reset' })
		}, timeout)
	}

	function handleSuggestedLink() {
		dispatch({ type: 'snackbar_reset' })
		router.push(link)
	}

	return (
		<div style={{ position: 'fixed', bottom: 20, left: 10 }}>
			<Alert isOpen={isOpen} color={color}>
				{text}
				{link ? (
					<span
						style={{ paddingLeft: 8, cursor: 'pointer', color: 'skyblue' }}
						onClick={handleSuggestedLink}
					>
						Go!
					</span>
				) : null}
			</Alert>
		</div>
	)
}

export default Snackbar
