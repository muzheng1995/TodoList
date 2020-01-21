import {connect} from 'react-redux';
import TodoForm from "../components/TodoForm";
import {addTodo, editTodo, getAllTodos, handleModalChange} from "../actions";

function mapStateToProps(state) {
    return {
        currentTodo:state.currentTodo,
        isShowModal:state.isShowModal,
        isCreate:state.isCreate,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (todo) => dispatch(addTodo(todo)),
        editTodo:(todo)=>dispatch(editTodo(todo)),
        handleModalChange:(flag) => dispatch(handleModalChange(flag)),
        getAllTodos: (todos) => dispatch(getAllTodos(todos)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoForm);