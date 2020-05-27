import { useReducer, createContext } from 'react'
import { Blog_reducer, Blog_initialState } from './reducer.blog'

export const Blog_context = createContext()

function Blog_contextProvider({ children }) {
	const [state, dispatch] = useReducer(Blog_reducer, Blog_initialState)

	return (
		<Blog_context.Provider value={{ state, dispatch }}>
			{children}
		</Blog_context.Provider>
	)
}

export default Blog_contextProvider
