import React from 'react';
import { Button } from 'react-bootstrap';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION_INSERT_CLICK_GAME = gql`
  mutation insertClickGame($color: String) {
    insert_click_game(objects: { color: $color }) {
      affected_rows
    }
  }
`;

const CircleBtn = ({ color }) => {
  const onMutationCompleted = () => {};

  const onMutationError = () => {};

  return (
    <Mutation
      mutation={MUTATION_INSERT_CLICK_GAME}
      onCompleted={onMutationCompleted}
      onError={onMutationError}
    >
      {(insertClickGame) => (
        <Button
          onClick={(e) => {
            e.preventDefault();
            insertClickGame({
              variables: { color },
            });
          }}
        >
          {color}
        </Button>
      )}
    </Mutation>
  );
};

export default CircleBtn;
