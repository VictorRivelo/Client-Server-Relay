import React from 'react';
import {
  createFragmentContainer,
  graphql,
  QueryRenderer
} from 'react-relay';
import { Environment } from './relay';
import { createQueryRenderer } from './createQueryRenderer';

//criando Post e PostFragmentContainer 
const Post = ({ post }: PostProps) => (
  <div>
    <span>{post.title}</span>
    <span>{post.description}</span>
  </div>
);
const PostFragmentContainer = createFragmentContainer(
  Post, {
  post: graphql`
    fragment Post_post on Post {
      id
      title
      description
    },
  `,
});

// Query {variables: ...Post_post}
const AppQR = ({ match }) => (
  <QueryRenderer
    environment={Environment}
    query={graphql`
      query MainQuery($id: ID!) {
        post(id: $id) {
          ...Post_post         
        }
      }
    `}
    variables={{
      id: match.param.id,
    }}
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }
      return (
        <PostFragmentContainer
          post={props.post} />
      );
    }}
  />
);

// Usage Query
const AppQR = createQueryRenderer(
  PostFragmentContainer,
  Post,
  {
    query: graphql`
      query MainQuery($id: ID!) {
        post(id: $id) {
          ...Post_post         
        }
      }
    `,
    queriesParams: (({ match }) => ({
      id: match.params.id
    }),
    getFragmentProps: (({ post }) => ({
      post,
    }),
  },
);