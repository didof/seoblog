import Layout from '../components/Layout'

import Snackbar from '../components/reusables/Snackbar'

import UI_contextProvider from '../context/UI/context.ui'

export default function App({ Component, pageProps }) {
	return (
		<UI_contextProvider>
			<Layout>
				<Component {...pageProps} />
				<Snackbar />
			</Layout>
		</UI_contextProvider>
	)
}
