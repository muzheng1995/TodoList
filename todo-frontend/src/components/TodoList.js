import React from 'react';
import axios from 'axios';
import {Table, Popconfirm, Divider, Input, Button, Icon} from "antd";
import Highlighter from 'react-highlight-words';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
    }

    deleteTodo(id) {
        const _this = this;
        console.log(id);
        axios.delete('/todo/' + id)
            .then(function (response) {
                _this.props.deleteTodo(id);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    editTodo(id) {
        const _this = this;
        _this.props.handleIsCreate(false);
        _this.props.handleModalChange(true);
        axios.get('/todo/' + id)
            .then(function (response) {
                _this.props.getTodo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    doneTodo(id) {
        const _this = this;
        console.log(id);
        axios.get('/todo/' + id)
            .then(function (response) {
                _this.props.getTodo(response.data);
                axios.put('/todo/' + id + '/', {
                    id: _this.props.currentTodo.id,
                    content: _this.props.currentTodo.content,
                    priority: _this.props.currentTodo.priority,
                    flag: 'Done',
                    expireDate: _this.props.currentTodo.expireDate,
                    createDate: _this.props.currentTodo.createDate,
                })
                    .then(function (response) {
                        _this.props.editTodo(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChange = (pagination, filters, sorter) => {
        this.props.setSort(sorter);
        this.props.setFilter(filters);
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        console.log(clearFilters);
        clearFilters();
        this.setState({
            searchText: '',
        });
    };

    render() {
        let {sortedInfo, filteredInfo} = this.props;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => b.id - a.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            width: 70,
        }, {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
            ...this.getColumnSearchProps('content'),
        }, {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            filters: [{
                text: 'High',
                value: 'High'
            }, {
                text: 'Middle',
                value: 'Middle',
            }, {
                text: 'Low',
                value: 'Low',
            }],
            onFilter: (value, record) => record.priority === value,
            filteredValue: filteredInfo.priority || null,
        }, {
            title: 'Flag',
            dataIndex: 'flag',
            key: 'flag',
            width: 100,
            filters: [{
                text: 'Todo',
                value: 'Todo'
            }, {
                text: 'Done',
                value: 'Done',
            }],
            onFilter: (value, record) => record.flag === value,
            filteredValue: filteredInfo.flag || null,
        }, {
            title: 'Expire Date',
            dataIndex: 'expireDate',
            key: 'expireDate',
            width: 130,
            sorter: (a, b) => {
                if (a.expireDate > b.expireDate) {
                    return 1;
                } else {
                    return -1;
                }
            },
            sortOrder: sortedInfo.columnKey === 'expireDate' && sortedInfo.order,
        }, {
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate',
            width: 130,
            sorter: (a, b) => {
                if (a.createDate > b.createDate) {
                    return 1;
                } else {
                    return -1;
                }
            },
            sortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order,
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            width: 180,
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteTodo(record.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                    <span style={{display: record.flag === 'Todo' ? "inline_block" : "none"}}>
                        <Divider type="vertical"/>
                        <a href='#' onClick={() => this.editTodo(record.id)}>Edit</a>
                        <Divider type="vertical"/>
                        <a href='#' onClick={() => this.doneTodo(record.id)}>Done</a>
                        </span>
                </div>
            )
        }];
        return (
            <Table columns={columns} dataSource={this.props.todos} rowKey={record => record.id}
                   onChange={this.onChange}/>
        )
    }
}

export default TodoList;