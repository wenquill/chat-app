import { ws } from '../../../api';

function MessagesList ({ messages }) {
  const removeMessage = id => {
    ws.deleteMessage(id);
  };

  return (
    <ol>
      {messages.map(m => (
        <li key={m._id}>
          <div>{JSON.stringify(m)}</div>
          <button onClick={() => removeMessage(m._id)}>del</button>
        </li>
      ))}
    </ol>
  );
}

export default MessagesList;
