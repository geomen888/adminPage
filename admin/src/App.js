import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'


export default () => (<Query query={GET_QUERY}>
{({ data, loading, error }) => {
  if (loading) return <div>loading</div>
  if (error) return <div>error</div>

  return <div>{JSON.stringify(data)}</div>

}}

</Query>);

const GET_QUERY = gql`{
  hello

}
`
