import React from 'react';
import {Form, Input, Tooltip, Icon, Cascader, Select, Col, Checkbox, Button} from 'antd';

import ImgCheck from '@/common/components/verification-code/img-check';

import regExp from "@/common/utils/regExp";
import AxiosHttp from '@/common/utils/axios';

const {Option} = Select;

class RegisterForm extends React.Component {
    state = {
        confirmDirty: false,
        verificationCode: ''
    };

    /**
     * 提交表单
     * @param e
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                AxiosHttp.axios('post', `/user/register`, values).then(res => {
                    console.log(res);
                })
            }
        });
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
     * 验证码获取
     * @param data
     */
    handleVerification(data) {
        const {form} = this.props;
        form.setFieldsValue({'verification': ''});
        this.setState({verificationCode: data.join('')});
    }

    /**
     * 验证码校验
     * @param rule
     * @param value
     * @param callback
     */
    testVerification = (rule, value, callback) => {
        const {form} = this.props;
        if (form.getFieldValue('verification') && form.getFieldValue('verification') !== this.state.verificationCode) {
            callback('验证码不正确');
        } else {
            callback();
        }
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                            {
                                pattern: regExp.reg_name,
                                message: '用户名必须以字母开头，长度1-30字符，允许字母数字下划线',
                            },
                        ],
                    })(<Input/>)}
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
                    })(<Input.Password/>)}
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
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            <span>昵称&nbsp;</span>
                            <Tooltip title="用于展示">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('nick', {
                        rules: [{required: true, message: '请输入昵称！', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="电话号码">
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入电话号码！'}],
                    })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: '请输入电子邮箱！',
                            },
                            {
                                type: 'email',
                                message: '请输入合法的电子邮箱！',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="验证码">
                    <Col span={12}>
                        {getFieldDecorator('verification', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                                {
                                    validator: this.testVerification.bind(this),
                                }
                            ],
                        })(<Input/>)}
                    </Col>
                    <Col span={12}>
                        <ImgCheck handleVerification={this.handleVerification.bind(this)}/>
                    </Col>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <div>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                我已阅读 <a href="">用户注册协议</a>
                            </Checkbox>,
                        )}
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </div>
                    <div>
                        已有账号 <a href={'#/user/login'}>前往登录!</a>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(RegisterForm);
