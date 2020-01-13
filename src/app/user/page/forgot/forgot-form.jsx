import React from 'react';
import {Form, Icon, Input, Button} from 'antd';

import SliderCheck from '@/common/components/verification-code/slider-check';

import AxiosHttp from '@/common/utils/axios';

class ForgotForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        verificationStatus: false
    };

    /**
     * 失去焦点验证密码是否相同
     * @param e
     */
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    /**
     * 确认密码校验--自定义校验
     * @param rule
     * @param value
     * @param callback
     */
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    };

    /**
     * 密码校验--自定义校验
     * @param rule
     * @param value
     * @param callback
     */
    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
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
                AxiosHttp.axios('put', `/user/forgot`, values).then(res => {
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
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="user-form user-forgot-form">
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
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入密码！',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       onBlur={this.handleConfirmBlur}/>)}
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
                        <Button type="primary" htmlType="submit" className="forgot-form-button">
                            提交
                        </Button>
                    </div>
                    <div>
                         <a href={'#/user/login'}>前往登录!</a>
                    </div>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(ForgotForm);
