import {connect} from 'react-redux';
import TodoList from "../components/TodoList";
import {
    handleModalChange,
    handleIsCreate,
    getTodo,
    deleteTodo,
    editTodo,
    setSort,
    setFilter, setSearch,
} from "../actions";

function mapStateToProps(state) {
    return {
        todos: state.todos,
        currentTodo: state.currentTodo,
        filteredInfo: state.filteredInfo,
        sortedInfo: state.sortedInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleModalChange: (flag) => dispatch(handleModalChange(flag)),
        handleIsCreate: (flag) => dispatch(handleIsCreate(flag)),
        getTodo: (todo) => dispatch(getTodo(todo)),
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        editTodo: (todo) => dispatch(editTodo(todo)),
        setSort:(sortedInfo) => dispatch(setSort(sortedInfo)),
        setFilter:(filteredInfo)=> dispatch(setFilter(filteredInfo)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);