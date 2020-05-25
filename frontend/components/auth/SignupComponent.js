import { useState } from 'react'
import { useFormik } from 'formik'

import * as Yup from 'yup'

import { signup } from '../../actions/auth'

import generateForm from '../../utils/form/generateForm'

import Alert from '../reusables/Alert'

const initialValues = {
	name: '',
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid e-mail format').required('Required'),
	password: Yup.string().required('Required'),
})

const SignupComponent = () => {
	const [status, setStatus] = useState({
		loading: false,
		error: false,
		message: '',
	})

	function handleSubmit(user, actions) {
		setStatus({ ...status, loading: true })

		signup(user).then((data) => {
			if (data.error) {
				setStatus((status) => ({
					loading: false,
					error: true,
					message: data.error,
				}))
				actions.resetForm()
			} else {
				setStatus((status) => ({
					loading: false,
					error: false,
					message: data.message,
				}))
			}
		})
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	})

	const formConfig = {
		fields: [
			[{ id: 'name' }, { id: 'email', type: 'email' }],
			{
				id: 'password',
				type: 'password',
			},
		],
		actions: [
			{
				type: 'submit',
				label: 'submit',
				color: 'primary',
			},
		],
	}

	return (
		<div>
			<Alert toggle={status.message} isWarning={status.error}>
				{status.message}
			</Alert>
			{generateForm(formConfig, formik, status)}
		</div>
	)
}

export default SignupComponent
