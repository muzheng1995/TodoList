export const addTodo = todo => ({
    type: 'ADD_TODO',
    todo
});

export const editTodo = todo => ({
    type: 'EDIT_TODO',
    todo
});

export const deleteTodo = id => ({
    type: 'DELETE_TODO',
    id
});

export const getAllTodos = todos => ({
    type: 'GET_ALL_TODOS',
    todos,
});

export const getTodayTodos = todos => ({
    type: 'GET_TODAY_TODOS',
    todos,
});

export const getNextSevenDaysTodos = todos => ({
    type: 'GET_NEXT_SEVEN_DAYS_TODOS',
    todos,
});

export const getTodo = todo => ({
    type: 'GET_TODO',
    todo,
});

export const handleIsCreate = flag => ({
    type: 'HANDLE_IS_CREATE',
    flag,
});

export const handleModalChange = flag => ({
    type: 'HANDLE_MODAL_CHANGE',
    flag,
});

export const setSort = (sortedInfo) => ({
    type: 'SET_SORT',
    sortedInfo,
});

export const setFilter = (filteredInfo) => ({
    type: 'SET_FILTER',
    filteredInfo,
});
