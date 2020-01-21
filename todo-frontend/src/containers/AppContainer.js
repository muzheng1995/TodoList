import {connect} from 'react-redux';
import App from '../components/App';
import {
    handleIsCreate,
    handleModalChange,
    getAllTodos,
    getTodayTodos,
    getNextSevenDaysTodos,
    setSort,
    setFilter,
} from "../actions";

function mapStateToProps(state) {
    return {
        filteredInfo:state.filteredInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleIsCreate: (flag) => dispatch(handleIsCreate(flag)),
        handleModalChange: (flag) => dispatch(handleModalChange(flag)),
        getAllTodos: (todos) => dispatch(getAllTodos(todos)),
        getTodayTodos: (todos) => dispatch(getTodayTodos(todos)),
        getNextSevenDaysTodos: (todos) => dispatch(getNextSevenDaysTodos(todos)),
        setSort:(sortedInfo) => dispatch(setSort(sortedInfo)),
        setFilter:(filteredInfo) => dispatch(setFilter(filteredInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);