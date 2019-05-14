import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {resendActivation} from '../actions/userActions'
import {addFlashMessage} from '../actions/flashMessages'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class ResendActivation extends Component {
    componentDidMount() {
        this.setInitialValues();
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {form, resendActivation, toggle, addFlashMessage} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                resendActivation(values).then((res) => {
                    if (res.data === 'Mail has been sent'){
                        addFlashMessage({
                            type: 'success',
                            text: 'New link activation has been sent to your email'
                        });
                        toggle();
                    } else {
                        addFlashMessage({
                            type: 'error',
                            text: 'No such user exists with this email'
                        });
                        toggle();
                    }
                })
            }
        });
    };

    setInitialValues = () => {
        const { form } = this.props;
        form.setFieldsValue({
            'email': this.props.emailValue
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout      = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        return (
          <div>
              <Form className="App-form" onSubmit={this.onSubmit}>
                  <Form.Item {...formItemLayout} label='E-mail'> {
                      getFieldDecorator('email', {
                          rules: [{
                              type: 'email',
                              message: 'e-mail is not valid'
                          },
                              {
                                  required: true,
                                  message: 'Please input your E-mail'
                              }]
                      })(<Input name='email'/>)
                  }
                  </Form.Item>
                  <Button className="App-button" type='primary' htmlType='submit'>Resend link activation</Button>
              </Form>
          </div>
        );
      }
}

ResendActivation.propTypes = {
    resendActivation: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    emailValue: PropTypes.string.isRequired
};

export default connect(null, {resendActivation, addFlashMessage})(Form.create()(ResendActivation));