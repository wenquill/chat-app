import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { getMessagesThunk } from './store/slices/messagesSlice';
import './App.css';
import { connect } from 'react-redux';
import { ws } from './api';

const initialValues = {
  body: '',
};

function App ({ messages, isFetching, error, limit, get }) {
  useEffect(() => {
    get(limit);
  }, [limit]);

  useLayoutEffect(() => {
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  const addMessage = (values, formikBag) => {
    ws.createMessage(values);
    formikBag.resetForm();
  };

  const removeMessage = id => {
    ws.deleteMessage(id);
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
      {isFetching && <div>Messages is loading. Please, wait...</div>}
      {!isFetching && !error && (
        <ol>
          {messages.map(m => (
            <li key={m._id}>
              <div>{JSON.stringify(m)}</div>
              <button onClick={() => removeMessage(m._id)}>del</button>
            </li>
          ))}
        </ol>
      )}
      <hr />
      <Formik initialValues={initialValues} onSubmit={addMessage}>
        {formikProps => (
          <Form>
            <Field name='body'></Field>
            <button type='submit'>Send</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
