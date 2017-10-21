
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => 
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value}
    });
  
  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0){
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const {data, errors, loading} = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading}>
          { !!errors.global && (
            <Message negative> 
              <Message.Header>Error</Message.Header>
              <p>{errors.global}</p>
            </Message> 
          )}
          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input type="email"
             id="email" 
             name="email" 
             placeholder="example@example.com" 
             value={data.email} onChange={this.onChange}/>
             {errors.email && <InlineError text= {errors.email} />}
          </Form.Field>
          
          <Button primary>Send Email</Button>
        </Form>
      </div>
    );
  }
};

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default ForgotPasswordForm;