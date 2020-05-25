import Layout from '../components/Layout'

import Snackbar from '../components/reusables/Snackbar'

import UI_contextProvider from '../context/UI/context.ui'

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<UI_contextProvider>
				<Component {...pageProps} />
				<Snackbar />
			</UI_contextProvider>
		</Layout>
	)
}
