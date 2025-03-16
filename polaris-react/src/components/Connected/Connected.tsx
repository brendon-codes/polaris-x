import React from 'react';

import {classNames} from '../../utilities/css';

import {Item} from './components';
import styles from './Connected.module.css';

export interface ConnectedProps {
  /** Content to display on the left */
  left?: React.ReactNode;
  /** Content to display on the right */
  right?: React.ReactNode;
  /** Connected content */
  children?: React.ReactNode;
  className?: string;
}

export function Connected({children, left, right, className}: ConnectedProps) {
  const leftConnectionMarkup = left ? (
    <Item position="left">{left}</Item>
  ) : null;

  const rightConnectionMarkup = right ? (
    <Item position="right">{right}</Item>
  ) : null;

  return (
    <div className={classNames(styles.Connected, className)}>
      {leftConnectionMarkup}
      <Item position="primary">{children}</Item>
      {rightConnectionMarkup}
    </div>
  );
}
