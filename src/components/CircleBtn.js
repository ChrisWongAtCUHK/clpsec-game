import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './CircleBtn.css';

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
        <div className={`text-center p-3`}>
          <button
            className={`circle-btn ${color}`}
            onClick={(e) => {
              e.preventDefault();
              insertClickGame({
                variables: { color },
              });
            }}
          >
            {color === 'orange' ? '-' : '+'}
          </button>
        </div>
      )}
    </Mutation>
  );
};

export default CircleBtn;
