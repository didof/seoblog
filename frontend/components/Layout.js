import Header from './Header'

const Layout = ({ children }) => (
	<React.Fragment>
		<Header />
		<main>{children}</main>
	</React.Fragment>
)

export default Layout