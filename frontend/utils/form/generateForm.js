import cheering from './exclamations'

function generateForm(config, formik, status) {
	return (
		<form className='needs-validation' onSubmit={formik.handleSubmit}>
			{config.fields.map((el, index) => {
				if (Array.isArray(el)) {
					return generateRow(el, index, formik)
				} else {
					return generateField(el, index, formik)
				}
			})}
			{config.actions.map((el, index) => {
				let spinner =
					el.type === 'submit' && status.loading ? (
						<div className='spinner-grow spinner-grow-sm' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : null

				return (
					<button
						key={`form-action-${el.type}-${index}`}
						className={`btn btn-${el.color}`}
						type={el.type}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{spinner}
						<span>{el.label}</span>
					</button>
				)
			})}
		</form>
	)
}

function generateRow(fields, index, formik) {
	return (
		<div className='form-row' key={`form-row-${index}`}>
			{fields.map((field, i) => (
				<div className='col' key={`form-col-${i}`}>
					{generateField(field, i, formik)}
				</div>
			))}
		</div>
	)
}

function generateField(field, index, formik) {
	let isTouched = formik.touched[field.id]
	let isError = formik.errors[field.id]
	let exclamation = cheering()

	return (
		<div className='form-group' key={`form-field-${index}`}>
			<label htmlFor={field.id}>{field.label ? field.label : field.id}</label>
			<input
				type={field.type ? field.type : 'text'}
				className={`form-control ${
					isTouched ? (!isError ? 'is-valid' : 'is-invalid') : null
				}`}
				id={field.id}
				name={field.id}
				{...formik.getFieldProps(field.id)}
			/>
			{isTouched ? (
				isError ? (
					<div className='invalid-feedback'>{formik.errors[field.id]}</div>
				) : (
					<div className='valid-feedback'>{exclamation}</div>
				)
			) : null}
		</div>
	)
}

export default generateForm
