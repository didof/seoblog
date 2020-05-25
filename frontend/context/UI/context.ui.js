import { useReducer, createContext } from 'react'
import { UI_reducer, UI_initialState } from './reducer.ui'

export const UI_context = createContext()

function UI_contextProvider({ children }) {
	const [state, dispatch] = useReducer(UI_reducer, UI_initialState)

	return (
		<UI_context.Provider value={{ state, dispatch }}>
			{children}
		</UI_context.Provider>
	)
}

export default UI_contextProvider
