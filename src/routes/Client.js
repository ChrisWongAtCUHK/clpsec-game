import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';
import client from '../graphql/apollo';

import CircleBtn from '../components/CircleBtn';

class Client extends Component {
  componentWillMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Row className="vh-100 justify-content-md-center align-items-center">
            <CircleBtn color="orange"></CircleBtn>
            <CircleBtn color="blue"></CircleBtn>
          </Row>
        </Container>
      </ApolloProvider>
    );
  }
}

export default Client;
