import React from 'react';
import Styles from "./../Styles/stylesRegistry";
import * as R from 'ramda';
import { Form, Field } from "react-final-form";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const REGISTER_MUTATION = gql`mutation($name:String!, $age:Float!, $password: String!){
    Register(name:$name, age:$age, password:$password)
}
`;

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
)

export default (props) => {
  const onSubmit = R.curry(async (fn, values) => {
    await sleep(300);

    console.info("register:onSubmit:fn:", fn);

    const execMem = await fn({
      variables: {
        ...R.compose(R.evolve({ age: parseInt }), R.dissoc('confirm'))(values)
      }
    });
    console.info("onSubmit:REGISTER_MUTATION:", execMem);
    if(R.has('data', execMem)) {
      props.setUser(false)
    }
    window.alert(JSON.stringify(values, 0, 2));
  });

  return (<Mutation mutation={REGISTER_MUTATION}>
    {(Register, { loading, error }) => (<Styles>
      <h1><Emoji label="flag" symbol="🏁" />Casino SignUp Form</h1>
      { 
      error
       ?  <div>Server Error</div>
      : loading
        ? <div>Loading</div>
        : <Form
          onSubmit={onSubmit(Register)}
          validate={values => {
            const errors = {};
            if(!values.name) {
              errors.name = "Required";
            }
            if(!values.password) {
              errors.password = "Required";
            }
            if(!values.confirm) {
              errors.confirm = "Required";
            } else if(values.confirm !== values.password) {
              errors.confirm = "Must match";
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
              <Field name="age">
                {({ input, meta }) => (
                  <div>
                    <label>Age</label>
                    <input {...input} type="number" placeholder="Age" />
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
              <Field name="confirm">
                {({ input, meta }) => (
                  <div>
                    <label>Confirm</label>
                    <input {...input} type="password" placeholder="Confirm" />
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
              <button type="button" onClick={() => props.setUser(false) }  style={{
                  color: 'green'
              }} disabled={loading}>
                  LogIn, already has registration?
               </button>
              </div>

              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />}
    </Styles>
    )}
  </Mutation>)
}