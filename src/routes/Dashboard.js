import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider, Subscription } from 'react-apollo';

import gql from 'graphql-tag';

import client from '../graphql/apollo';

import Box from '../components/Box';

const SUBSCRIPTION_CLICK_COUNT = gql`
  subscription getClickCountByColor {
    click_game_count_by_color {
      count
      color
    }
  }
`;

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
        <Subscription subscription={SUBSCRIPTION_CLICK_COUNT}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :</p>;
            const counts = data['click_game_count_by_color'];
            const orange_count = counts.find((c) => c.color === 'orange').count;
            const blue_count = counts.find((c) => c.color === 'blue').count;

            return (
              <Row className="vh-100 justify-content-md-center align-items-center">
                <Box color="orange" count={orange_count} />
                <Box color="blue" count={blue_count} />
              </Row>
            );
          }}
        </Subscription>
      </Container>
    </ApolloProvider>
  );
};

export default Dashboard;
