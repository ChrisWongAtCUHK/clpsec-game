import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import client from '../graphql/apollo';

import Box from '../components/Box';

const Dashboard = () => {
  // The game can be reset when the page is refreshed
  client
    .mutate({
      mutation: gql`
        mutation deleteAllClicks {
          delete_click_game(where: {}) {
            affected_rows
          }
        }
      `,
    })
    .then((result) => console.log(result));

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
};

export default Dashboard;
