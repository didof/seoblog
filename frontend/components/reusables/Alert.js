import React, { useRef } from 'react'

function Alert({
	children,
	isWarning = false,
	dismissible = true,
	toggle = false,
}) {
	const alertRef = useRef()

	const customClass = `alert alert-${isWarning ? 'warning' : 'secondary'} ${
		dismissible ? 'alert-dismissible fade show' : null
	}`

	if (toggle)
		return (
			<div className={customClass} ref={alertRef}>
				{children}
				<button
					type='button'
					className='close'
					aria-label='Close'
					onClick={() => {
						alertRef.current.classList.remove('show')
						alertRef.current.setAttribute('aria-hidden', 'true')
					}}
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
		)
	else return null
}

export default Alert
