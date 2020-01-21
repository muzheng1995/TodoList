import React from 'react';
import '../css/App.css';
import 'antd/dist/antd.css';
import TodoListContainer from "../containers/TodoListContainer";
import TodoFormContainer from "../containers/TodoFormContainer";
import {Layout, Menu, Icon, Button} from 'antd';
import axios from "axios";

const {Sider, Content} = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showModal = () => {
        this.props.handleIsCreate(true);
        this.props.handleModalChange(true);
    };

    handleMenu = e => {
        if (e.key === '1') {
            this.getAllTodos();
        } else if (e.key === '2') {
            this.getNextSevenDaysTodos();
        } else {
            this.getTodayTodos();
        }
    };

    getAllTodos() {
        const _this = this;
        axios.get('/todoList')
            .then(function (response) {
                let todos = response.data;
                todos.sort((a, b) => b.id - a.id);
                _this.props.getAllTodos(todos);
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    error: error
                })
            })
    }

    getTodayTodos() {
        const _this = this;
        axios.get('/today')
            .then(function (response) {
                let todos = response.data;
                todos.sort((a, b) => b.id - a.id);
                _this.props.getTodayTodos(todos);
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    error: error
                })
            })
    }

    getNextSevenDaysTodos() {
        const _this = this;
        axios.get('/next7days')
            .then(function (response) {
                let todos = response.data;
                todos.sort((a, b) => b.id - a.id);
                _this.props.getNextSevenDaysTodos(todos);
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    error: error
                })
            })
    }

    componentDidMount() {
        this.getAllTodos();
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider trigger={null}>
                    <div className="logo">
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenu}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span>All</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span>Next 7 Days</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span>Today</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <div style={{marginBottom: 16}}>
                            <Button type="primary" onClick={this.showModal}>
                                Add Todo
                            </Button>
                            <Button style={{marginLeft: 16}} onClick={() => {
                                this.props.setFilter(null);
                            }}>
                                Clear Filters
                            </Button>
                            <Button style={{marginLeft: 16}} onClick={() => this.props.setSort(null)}>
                                Clear Sorts
                            </Button>
                            <Button style={{marginLeft: 16}} onClick={() => {
                                this.props.setFilter(null);
                                this.props.setSort(null);
                            }}>
                                Clear Filters and Sorts
                            </Button>
                        </div>
                        <TodoFormContainer/>
                        <TodoListContainer/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;

