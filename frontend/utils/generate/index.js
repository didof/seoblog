import Router from 'next/router'

function handleClick(url) {
	Router.push(url)
}

export function generateList(data, actualPrefix, header) {
	const isButtons = data.length <= 3
	const parentClass = isButtons ? 'btn-group' : 'list-group list-group-flush'
	const childClass = isButtons
		? 'btn btn-secondary'
		: 'list-group-item list-group-item-action'

	return (
		<div className='mx-auto' style={{ width: '100%' }}>
			{header && <h6 className='card-subtitle mb-2 text-muted'>{header}</h6>}
			<div className={parentClass}>
				{data.map(({ id, header, label, url, prefix = true }) => (
					<button
						key={`list-group-item-${header}-${id}`}
						className={childClass}
						onClick={
							prefix
								? () => handleClick(actualPrefix + url)
								: () => handleClick(url)
						}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	)
}

export function generateCard(header, description, body) {
	return (
		<div className='card'>
			<div className='card-body'>
				<h5 className='card-title'>{header}</h5>
				<p className='card-text'>{description}</p>
				{body}
			</div>
		</div>
	)
}
