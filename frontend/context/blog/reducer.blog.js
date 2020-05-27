export const Blog_reducer = (state, action) => {
	switch (action.type) {
		case 'save_draft':
			console.log(action.payload)
			return {
				...state,
				autosave: action.payload.autosave,
				draft: {
					...state.draft,
					title: action.payload.title,
					body: action.payload.body,
				}
			}
		default:
			return state
	}
}

export const Blog_initialState = {
	autosave: false,
	draft: {
		title: '',
		body: '',
	},
}
