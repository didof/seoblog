import React, { useState, useEffect, useContext } from 'react'
import { API } from '../../../config'

import { UI_context } from '../../../context/UI/context.ui'

import AdminGuard from '../../../components/auth/AdminGuard'

import Cockpit from '../../../components/crud/Cockpit'
import List from '../../../components/crud/List'

import { getAll } from '../../../actions/category-tag'

const Feature = ({ feature }) => {
	const {
		state: { reload },
		dispatch,
	} = useContext(UI_context)

	const [list, setList] = useState([])

	async function updatedList() {
		const formatted = await getAll(feature)
		if (feature === 'blog') {
			const preview = formatted.map((el) => ({
				_id: el._id,
				name: el.title,
				slug: el.slug,
			}))
			setList(preview)
			return
		}

		setList(formatted)
	}

	useEffect(() => {
		updatedList()
	}, [])
	useEffect(() => {
		reload && updatedList()
		dispatch({ type: 'reload_off' })
	}, [reload])

	return (
		<AdminGuard>
			<div className='container'>
				<i className='far fa-trash-alt'></i>
				<div className='row'>
					<div className='col-md-12 mb-8'>
						<h1 className='display-5'>Manage {feature} </h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-8'>
						<Cockpit feature={feature} />
					</div>
					<div className='col-md-4'>
						<List list={list} feature={feature} />
					</div>
				</div>
			</div>
		</AdminGuard>
	)
}

Feature.getInitialProps = async (ctx) => {
	const { feature } = ctx.query

	// let list = await fetch(`${API}/api/${feature}/`)
	// list = await list.json()

	return { feature }
}

export default Feature
