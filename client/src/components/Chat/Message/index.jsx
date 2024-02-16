import { FaTrash } from 'react-icons/fa6';
import styles from './Message.module.scss';
import { ws } from '../../../api';

function Message ({ message }) {
  const date = new Date().getDate();

  const removeMessage = id => {
    ws.deleteMessage(id);
  };

  return (
    <div className={styles.message}>
      <p>{message.body}</p>
      <div className={styles.bottomSection}>
        <button
          className={styles.removeBtn}
          onClick={() => removeMessage(message._id)}
        >
          <FaTrash size={16} />
        </button>
        <p className={styles.date}>
          {date.toString() === message.createdAt.slice(8, 10)
            ? 'today at '
            : `${message.createdAt.slice(0, 10).split('-').join('.')} at `}
          {message.createdAt.slice(11, 16)}
        </p>
      </div>
    </div>
  );
}

export default Message;
