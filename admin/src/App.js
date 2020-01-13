import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Profile from './components/Profile';
import Header from './components/Header';

import './App.css';

export default () => (<Query query={ME_QUERY}>
{({ data, loading, error }) => {
  if (loading) return <div>loading</div>
  if (error) return <div>error</div>
 return (<Router>
  <Switch> 
  <>
    <Header user={data}/>
    <Route exact path="/" component={Home}/> 
    <Route path="/profile/:id" component={Profile}/> 
    </>
 </Switch>
 </Router>

 )
  // return <div>{JSON.stringify(data)}</div>

}}

</Query>);

const ME_QUERY = gql`{
    Me 
}`
// const GET_QUERY = gql`{
//   hello

// }
// `
