import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { array, bool, func, object, number } from 'prop-types';

import scoreboardUsers from '../graphql/scoreboardUsers.graphql';
import setProperty from '../graphql/setProperty.graphql';
import userHighScore from '../graphql/userHighScore.graphql';

import Challenge from '../components/Challenge/Challenge';

const DEV_ID = process.env.NODE_ENV === 'development' ? '59d48fbd4bd6e1246309af67' : '5abb0ae8b5c4580030f1902f';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const queriesToRefetch = (id) => (
  [
    {
      query: scoreboardUsers,
    },
    {
      query: userHighScore,
      variables: { id }
    }
  ]
);

const withData = compose(
  graphql(setProperty, {
    props: ({ mutate }) => ({
      setScore: (id, property) =>
        mutate({ variables: { id, property }, refetchQueries: queriesToRefetch(id) }),
    }),
  }),
  graphql(scoreboardUsers, {
    props: ({ data }) => {
      if (!data.scoreboardUsers) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        scoreUsers: data.scoreboardUsers,
      };
    }
  }),
  graphql(userHighScore, {
    props: ({ data }) => {
      if (!data.user) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        highScore: data.user.highScore || 0,
      };
    },
    options: ({ user }) => ({ variables: { id: user._id } })
  }),
  graphql(userHighScore, {
    props: ({ data }) => {
      if (!data.user) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        devHighScore: data.user.highScore || 0,
      };
    },
    options: () => ({ variables: { id: DEV_ID } })
  })
);

const Contest = ({ highScore, setScore, scoreUsers, user, devHighScore, loading }) => (
  loading
    ? null
    : (
      <Challenge
        highScore={highScore}
        setProperty={setScore}
        scoreboardUsers={scoreUsers}
        user={user}
        devHighScore={devHighScore}
      />
    )
);


Contest.propTypes = {
  devHighScore: number,
  highScore: number,
  loading: bool,
  setScore: func.isRequired,
  scoreUsers: array,
  user: object
};

Contest.defaultProps = {
  devHighScore: 0,
  highScore: 0,
  loading: false,
  scoreUsers: [],
  user: {}
};

const ContestWithData = withData(Contest);

export default connect(mapStateToProps, null)(ContestWithData);
