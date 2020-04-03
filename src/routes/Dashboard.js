import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ApolloProvider, Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import client from '../graphql/apollo';
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

// calculate the elapsed time
const getClickCountsByColor = (click_game, color) => {
  const first_clicked_at =
    click_game.length > 0 ? click_game[0]['clicked_at'] : null;

  return click_game
    .filter((c) => c.color === color)
    .map((cc) => {
      const duration = moment
        .duration(moment(cc.clicked_at).diff(moment(first_clicked_at)))
        .as('seconds');
      return {
        color: cc.color,
        second: duration,
      };
    });
};

const Dashboard = () => {
  // The game can be reset when the page is refreshed
  // client
  //   .mutate({
  //     mutation: gql`
  //       mutation deleteAllClicks {
  //         delete_click_game(where: {}) {
  //           affected_rows
  //         }
  //       }
  //     `,
  //   })
  //   .then((result) => console.log(result));

  return (
    <ApolloProvider client={client}>
      <Container>
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
              <Row className="vh-100 justify-content-md-center align-items-center">
                <pre>{JSON.stringify(orange_clicks, null, 2)}</pre>
                <Box color="orange" count={orange_clicks.length} />
                <Box color="blue" count={blue_counts.length} />
              </Row>
            );
          }}
        </Subscription>
      </Container>
    </ApolloProvider>
  );
};

export default Dashboard;
