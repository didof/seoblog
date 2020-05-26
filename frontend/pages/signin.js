import { Container } from 'reactstrap'

import SigninComponent from '../components/auth/SigninComponent'

const Signin = () => (
	<main>
		<Container className='themed-container' fluid='sm'>
			<h1 className='display-1'>Signin</h1>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<SigninComponent />
				</div>
			</div>
		</Container>
	</main>
)

export default Signin
