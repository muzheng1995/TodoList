import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {DatePicker, Form, Input, Modal, Radio} from "antd";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    handleCancel = e => {
        console.log(e);
        this.props.handleModalChange(false);
        this.props.form.resetFields();
    };

    handleOk = e => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (_this.props.isCreate) {
                    axios.post('/todoList/', {
                        content: values.content,
                        priority: values.priority,
                        flag: 'Todo',
                        expireDate: values.expireDate.format('YYYY-MM-DD'),
                        createDate: moment().format('YYYY-MM-DD'),
                    })
                        .then(function (response) {
                            _this.props.handleModalChange(false);
                            _this.props.addTodo(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                            _this.setState({
                                error: error
                            })
                        })
                } else {
                    axios.put('/todo/' + _this.props.currentTodo.id + '/', {
                        id: _this.props.currentTodo.id,
                        content: values.content,
                        priority: values.priority,
                        flag: _this.props.currentTodo.flag,
                        expireDate: values.expireDate.format('YYYY-MM-DD'),
                        createDate: _this.props.currentTodo.createDate,
                    })
                        .then(function (response) {
                            _this.props.handleModalChange(false);
                            _this.props.editTodo(response.data);
                            console.log("put " + response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                            _this.setState({
                                error: error
                            })
                        })
                }
            }
        });
        this.props.form.resetFields();
    };

    disabledDate(current) {
        return current < moment().startOf('day');
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {TextArea} = Input;
        return (
            <div>
                <Modal
                    title={this.props.isCreate ? 'Add Todo' : 'Edit Todo'}
                    visible={this.props.isShowModal}
                    okText={this.props.isCreate ? 'Create' : 'Confirm'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label={'Content'}>
                            {getFieldDecorator('content', {
                                initialValue: this.props.isCreate ? '' : this.props.currentTodo.content,
                                rules: [{required: true, message: 'please input content'}]
                            })(
                                <TextArea
                                    allowClear
                                    autoSize={{minRows: 3, maxRows: 5}}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label={'Priority'}>
                            {getFieldDecorator('priority', {
                                initialValue: this.props.isCreate ? 'Middle' : this.props.currentTodo.priority,
                                rules: [{required: true, message: 'please input priority'}]
                            })(
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="High">High</Radio.Button>
                                    <Radio.Button value="Middle">Middle</Radio.Button>
                                    <Radio.Button value="Low">Low</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label={'expireDate'}>
                            {getFieldDecorator('expireDate', {
                                initialValue: this.props.isCreate ? moment() : moment(this.props.currentTodo.expireDate),
                                rules: [{required: true, message: 'please input expireDate'}]
                            })(
                                <DatePicker disabledDate={this.disabledDate}/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

const WrappedTodoForm = Form.create()(TodoForm);
export default WrappedTodoForm;