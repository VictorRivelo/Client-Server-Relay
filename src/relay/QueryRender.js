import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Environment } from './relay';


const App = () => (
  // o bloco como um todo Renderiza dados de usuarios logados
  <QueryRenderer

    // Diz como pegar e armazenar os dados
    environment={Environment}

    // graphql a ser executada
        // essa query irá retirar id e name do usuario logado (me)
    query={graphql`
      query MainQuery {
        me {
          id
          name
        }
      }
    `}

    // definição das variaveis
    variables={{}}

    // Rendezira um componente que recebe (error, props) baseado em query e
    // relay config
    
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }
      return <div>LoggedUser ID: {props.me.id}</div>;
    }}
  />
);
export default App;