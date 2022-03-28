import * as React from 'react';
import { BlogLink, Signature } from '../../atoms';
import styles from './Navbar.module.scss';

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <BlogLink pathTo={'/'}>
        <Signature />
      </BlogLink>
      <ul>
        <li>
          <BlogLink pathTo={'/'}>Home</BlogLink>
        </li>
        <li>
          <BlogLink pathTo={'/blog'}>Blog</BlogLink>
        </li>
        <li>
          <BlogLink pathTo={'/login'}>Login</BlogLink>
        </li>
        <li>
          <BlogLink pathTo={'/about'}>About</BlogLink>
        </li>
      </ul>
    </nav>
  );
};
