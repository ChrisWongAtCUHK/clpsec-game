import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';
import client from '../graphql/apollo';

import Box from '../components/Box';

class Dashboard extends Component {
  componentWillMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Row className="vh-100 justify-content-md-center align-items-center">
            <Box color="orange"></Box>
            <Box color="blue"></Box>
          </Row>
        </Container>
      </ApolloProvider>
    );
  }
}

export default Dashboard;
