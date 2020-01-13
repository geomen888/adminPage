import React from 'react';
import { Link } from 'react-router-dom';
import { USER_TOKEN } from './../ulils/client';
import { ApolloConsumer } from 'react-apollo';

const SignOut = () => {
    const handleSigOut = client => {
        USER_TOKEN.remove();
        client.writeData({ data: { isAuthenticated: false } })
    }
    return (
        <ApolloConsumer>
            {(client) => (<a href="/" className="app__logout" onClick={() => handleSigOut(client)}>
                <span> logout </span><i className="i-sign-out" />
            </a>)}

        </ApolloConsumer>);
}

export default (props) => {
    const { id } = JSON.parse(props.user.Me)
    console.info("header:", id);
    return (<div>
        <h3>HEADER</h3>
         <h4><span> My id: { id }</span></h4>
        {id && <SignOut /> }
        <br />
        <br />


        <Link to="/" className="toHome">
            home
        </Link>
        <br />
        {id && <Link to={`/profile/${id}`} className="toProfile" >
            profile
            </Link>

        }

    </div>)
}