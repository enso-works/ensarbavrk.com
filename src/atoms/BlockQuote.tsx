import styles from './atoms.module.scss';

export const BlockQuote = ({ children }: React.PropsWithChildren) => {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
};
