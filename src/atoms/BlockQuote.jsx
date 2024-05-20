import styles from './atoms.module.scss';
export const BlockQuote = ({ children }) => {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
};
