import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider, Subscription } from 'react-apollo';
import gql from 'graphql-tag';

import client from '../graphql/apollo';
import ClickGameLineChart from '../components/ClickGameLineChart';
import Box from '../components/Box';

// realtime update data
// filter by clickedt_at
const SUBSCRIPTION_CLICK_GAME = gql`
  subscription getClickGame {
    click_game_in_time_range {
      color
      clicked_at
    }
  }
`;

//  group by color
const getClickCountsByColor = (click_game, color) => {
  return click_game.filter((c) => c.color === color);
};

const Dashboard = () => {
  // The game can be reset when the page is refreshed
  client.mutate({
    mutation: gql`
      mutation deleteAllClicks {
        delete_click_game(where: {}) {
          affected_rows
        }
      }
    `,
  });

  return (
    <ApolloProvider client={client}>
      <Subscription subscription={SUBSCRIPTION_CLICK_GAME}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          const click_game = data['click_game_in_time_range'];

          // filter by color
          // calculate the timespan from first clicked_at in second
          const orange_clicks = getClickCountsByColor(click_game, 'orange');
          const blue_counts = getClickCountsByColor(click_game, 'blue');

          return (
            <Container className="vh-100">
              <Row className="w-100">
                <ClickGameLineChart click_game={click_game} />
              </Row>
              <Row className="justify-content-md-center align-items-center">
                <Box color="orange" count={orange_clicks.length} />
                <Box color="blue" count={blue_counts.length} />
              </Row>
            </Container>
          );
        }}
      </Subscription>
    </ApolloProvider>
  );
};

export default Dashboard;
