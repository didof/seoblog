import React from 'react'
import fetch from 'isomorphic-unfetch'
import { API } from '../../../config'

import AdminGuard from '../../../components/auth/AdminGuard'

const Feature = ({ feature, list }) => {
	return (
		<AdminGuard>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 mb-8'>
						<h1 className='display-5'>Manage {feature}</h1>
					</div>
				</div>
				<div className='row'>
					<div className="col-md-8">CRUD Cockpit</div>
					<div className='col-md-4'>
						<div className='list-group list-group-flush'>
							{list.map((el) => (
								<button
									key={`list-group-item-${feature}-${el._id}`}
									className='list-group-item list-group-item-action'
								>
									{el.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</AdminGuard>
	)
}

Feature.getInitialProps = async (ctx) => {
	const { feature } = ctx.query

	let list = await fetch(`${API}/api/${feature}/`)
	list = await list.json()

	return { feature, list }
}

export default Feature
