import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Col} from 'antd';

import SliderCheck from '../../../common/components/verification-code/slider-check';

import AxiosHttp from '../../../common/utils/http/axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        verificationStatus: false,
    };

    /**
     * 验证是否成功
     * @param isSuccess
     */
    handleVerification(isSuccess) {
        this.setState({verificationStatus: isSuccess}, () => {
            this.props.form.resetFields('verification');
        });
    }

    /**
     * 校验验证码
     * @param rule
     * @param value
     * @param callback
     */
    testVerification = (rule, value, callback) => {
        if (!this.state.verificationStatus) callback('请拖动滑块验证');
        callback();
    };

    /**
     * 登录提交表单
     * @param e
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AxiosHttp.axios('post', `/user/login`, values).then(res => {
                    console.log(res);
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="user-form user-login-form">
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入用户密码!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="验证">
                    {getFieldDecorator('verification', {
                        rules: [{validator: this.testVerification.bind(this)}],
                    })(
                        <SliderCheck handleVerification={this.handleVerification.bind(this)}/>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <div>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <a className="login-form-forgot" href={'#/user/forgot'}>
                            忘记密码
                        </a>
                    </div>
                    <div>
                        还没有账号 <a href={'#/user/register'}>现在注册!</a>
                    </div>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(LoginForm);
