import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='UTF-8' />
					{/* <meta name='description' content='Free Web tutorials' />
					<meta name='keywords' content='HTML, CSS, XML, JavaScript' /> */}
					<meta name='author' content='John Doe' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css'
					/>
				</Head>
				<body>
					<Main></Main>
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default CustomDocument
