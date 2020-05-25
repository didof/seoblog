import { Container } from 'reactstrap'

import SignupComponent from '../components/auth/SignupComponent'

const Signup = () => (
	<main>
		<Container className='themed-container' fluid='sm'>
			<h1 className='display-1'>Signup</h1>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<SignupComponent />
				</div>
			</div>
		</Container>
	</main>
)

export default Signup
