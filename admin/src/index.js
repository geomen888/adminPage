import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './components/Auth';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import 'isomorphic-fetch';
import { USER_TOKEN } from './ulils/client';

const client = new ApolloClient({
    uri: "http://localhost:9003/graphql",
    fetchOptions: {
            credentials: "include"
    },
    request: operation=> {
        const { token } = USER_TOKEN.get();
        operation.setContext({
            headers: {
                Authorization: `JWT ${token || ''}`
            }
        })
    },
    clientState: {
        defaults: {
            isAuthenticated: USER_TOKEN.notEmpty
        }
    }
});
const IS_LOGGED_IN_QUERY = gql`query {
    isAuthenticated @client
}`;



ReactDOM.render(
    <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN_QUERY}>
            {({ data }) => data.isAuthenticated ? <App /> : <Auth />}
        </Query>
    </ApolloProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
