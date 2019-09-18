import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { QueryRenderer } from 'react-relay';
import  { GraphQLTaggedNode, Variables } from 'react-relay';
import Environment from '../Environment';
import ErrorView from './ErrorView';
import LoadingView from './LoadingView';

//A few configs to make our helper customizable
type Config = {
  query: GraphQLTaggedNode,
  queriesParams?: (props: object) => Variables,
  variables?: Variables,
  getFragmentProps?: (fragmentProps: object) => object;
  loadingView?: React.ReactNode | null;
};

//It receives a Fragment Container, a Component and a config
export default function createQueryRenderer(
  FragmentComponent: React.Component,
  Component: React.Component,
  config: Config,
) {
  const { query, queriesParams } = config;
  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      
      //It will get QR variables using config.variables or dynamic queriesParams
      const variables = queriesParams
        ? queriesParams(this.props) :
        config.variables;
      return (

        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({ error, props, retry }) => {

            // Contenplando casos de erro e deu bom
            if (error) {
              return (
                <ErrorView
                  error={error}
                  retry={retry}/>
              );
            }
            if (props) {
              const fragmentProps = config.getFragmentProps
                ? config.getFragmentProps(props)
                : { query: props };

              return (
                <FragmentComponent
                  {...this.props}
                  {...fragmentProps}
                />
              );
            }

            // It will render null, custom loadingView or default LoadingView
            //based on the config
            if (config.loadingView !== undefined) {
              return config.loadingView;
            }
            return <LoadingView />
          }}
        />
      );
    }
  }
  return hoistStatics(QueryRendererWrapper, Component);
}