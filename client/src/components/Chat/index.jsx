import { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getMessagesThunk } from '../../store/slices/messagesSlice';
import MessagesList from './MessagesList';
import InputMessage from './InputMessage';

function Chat ({ messages, isFetching, error, get, limit }) {
  useEffect(() => {
    get(limit);
  }, [limit]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
      {isFetching && <div>Messages is loading. Please, wait...</div>}
      {!isFetching && !error && <MessagesList messages={messages} />}
      <InputMessage />
    </div>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
