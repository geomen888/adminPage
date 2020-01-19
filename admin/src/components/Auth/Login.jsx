import React from 'react';
import Styles from "./../Styles/stylesRegistry";
import * as R from 'ramda';
import { Form, Field } from "react-final-form";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { USER_TOKEN } from './../../ulils/client';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_MUTATION = gql`mutation($name: String!, $password: String!){
  Login(name:$name, password:$password) {
    accessToken
  }
}`;


const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        value={props.label}
    >
        {props.symbol}
    </span>
);

  const Register = (props) =>  (<button type="button" onClick={() => props.setUser(true)} style={{
                                    color: 'pink'
                                }} disabled={props.loading}>
                                    Doesn't have credentials yet,  pls register!
                </button>)

export default (props) => {

   
    const onSubmit = R.curryN(3, async (fn, client, values) => {
        await sleep(300);
        console.info("login:onSubmit:fn:", fn);
        try {
                 const execMem = await fn({
            variables: {
                ...values
            }
        });
        console.info("onSubmit:REGISTER_MUTATION:", execMem);
        if(R.has('data', execMem)) {
            USER_TOKEN.set(R.path(['data', 'Login'], execMem));
            client.writeData({ data: { isAuthenticated: true } })
        }
        window.alert(JSON.stringify(values, 0, 2));
        } catch (error) {
            console.error(error)
        }
       
    });

    return (<Mutation mutation={LOGIN_MUTATION}>
        {(Login, { loading, error, called, client }) => {   
          return (<Styles>
            <h1><Emoji label="flag" symbol="🏁" />Casino SignIn Form</h1>
            {error ? <div>
            <div>Server Error {error.message}</div>
             <Register setUser={props.setUser} loading={loading} />
            </div>
           :  loading
                ? (<div>Loading</div>)
                : <Form
                    onSubmit={onSubmit(Login, client)}
                    validate={values => {
                        const errors = {};
                        if(!values.name) {
                            errors.name = "Required";
                        }
                        if(!values.password) {
                            errors.password = "Required";
                        }

                        return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="name">
                                {({ input, meta }) => (
                                    <div>
                                        <label>Name</label>
                                        <input {...input} type="text" placeholder="Name" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="password">
                                {({ input, meta }) => (
                                    <div>
                                        <label>Password</label>
                                        <input {...input} type="password" placeholder="Password" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <div className="buttons">
                                <button type="submit" disabled={submitting || loading}>
                                    Submit
            </button>
                                <button
                                    type="button"
                                    onClick={reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
            </button>
                               <Register setUser={props.setUser} loading={loading} />
                            </div>

                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    )}
                />}
          </Styles>)
          }
        }
    </Mutation>)
}