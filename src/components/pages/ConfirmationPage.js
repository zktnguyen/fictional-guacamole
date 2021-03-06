import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false,
    errors: {}
  };

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(err => this.setState({ loading: false, success: false, errors: err.response.data.errors }));
  };

  render() {
    const { loading, success, errors } = this.state;
    return (
      <div>
        {loading && 
          (<Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading && success && 
          (<Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Thank you. Your email has been verified.</Message.Header>
              <Link to='/dashboard'>Go to Dashboard</Link>
            </Message.Content>
          </Message>
        )}

        {!loading && !success &&
          (<Message negative icon>
            <Icon name="warning sign" />
          {errors.global && (
            <Message.Content>
              <Message.Header>Oops. Something went wrong.</Message.Header> 
              <p>{errors.global}</p>
              
            </Message.Content>
          )}
          </Message>
        )}
      </div>
    );
  };
};

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);