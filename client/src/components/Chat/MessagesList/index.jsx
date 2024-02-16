import { useLayoutEffect, useRef } from 'react';
import Message from '../Message';
import styles from './MessageList.module.scss';

function MessagesList ({ messages }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    containerRef.current.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
    console.log('wfwefwef')
  }, [messages.length, messages]);

  return (
    <ol className={styles.list} ref={containerRef}>
      {messages.map(m => (
        <li className={styles.listItem} key={m._id}>
          <Message message={m} />
        </li>
      ))}
    </ol>
  );
}

export default MessagesList;
