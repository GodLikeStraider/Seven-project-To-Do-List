import React from 'react';
import styles from '../../blocks/header/Header.module.css';

interface HeaderProps {
  todoCount: number;
}

export const Header: React.FC<HeaderProps> = ({ todoCount }) => (
  <div className={styles.header_container}>
    <h1 className={styles.header_title}>
      Общее количество задач: <b>{todoCount}</b>
    </h1>
  </div>
);
