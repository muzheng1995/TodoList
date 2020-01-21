const defaultState = {
    todos: [],
    currentTodo: {},
    isCreate: false,
    isShowModal: false,
    filteredInfo: null,
    sortedInfo: null,
};

const index = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_ALL_TODOS':
            return Object.assign({}, state, {
                todos: action.todos,
            });
        case 'GET_TODAY_TODOS':
            return Object.assign({}, state, {
                todos: action.todos,
            });
        case 'GET_NEXT_SEVEN_DAYS_TODOS':
            return Object.assign({}, state, {
                todos: action.todos,
            });
        case 'GET_TODO':
            return Object.assign({}, state, {
                currentTodo: action.todo,
            });
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [
                    action.todo,
                    ...state.todos,
                ],
                currentTodo: action.todo,
            });
        case 'EDIT_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    if (todo.id === action.todo.id) {
                        return action.todo;
                    } else {
                        return todo;
                    }
                }),
                currentTodo: action.todo,
            });
        case 'DELETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id)
            });
        case 'HANDLE_IS_CREATE':
            return Object.assign({}, state, {
                isCreate: action.flag,
            });
        case 'HANDLE_MODAL_CHANGE':
            return Object.assign({}, state, {
                isShowModal: action.flag,
            });
        case 'SET_SORT':
            return Object.assign({}, state, {
                sortedInfo: action.sortedInfo,
            });
        case 'SET_FILTER':
            return Object.assign({}, state, {
                filteredInfo: action.filteredInfo,
            });
        default:
            return state
    }
};

export default index