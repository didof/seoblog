import React, { useContext } from 'react'

import { remove } from '../../actions/category-tag'
import { getCookie } from '../../actions/auth'

import { UI_context } from '../../context/UI/context.ui'

function List({ list, feature }) {
	const { dispatch } = useContext(UI_context)

	const handleRemove = (e) => {
		const slug = e.target.parentNode.id
		const token = getCookie('token')
		remove(slug, token, feature).then((data) => {
			if (data.error) {
				dispatch({
					type: 'snackbar_on',
					payload: { color: 'warning', message: data.error, timeout: 5000 },
				})
			} else {
				dispatch({ type: 'reload_on' })
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
		})
	}

	return (
		<div className='list-group list-group-flush'>
			{list && list.map((el) => (
				<span
					key={`list-group-item-${feature}-${el._id}`}
					id={el.slug}
					className='list-group-item list-group-item-action d-inline-flex flex-row justify-content-between align-items-center'
					onMouseEnter={(e) => {
						let btn = e.target.childNodes[1]
						if (btn) btn.style.visibility = 'visible'
					}}
					onMouseLeave={(e) => {
						let btn = e.target.childNodes[1]
						if (btn) btn.style.visibility = 'hidden'
					}}
				>
					{el.name}
					<button
						className='btn btn-warning'
						style={{ visibility: 'hidden' }}
						onClick={handleRemove}
					>
						Remove
					</button>
				</span>
			))}
		</div>
	)
}

export default List
