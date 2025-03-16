import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './Truncate.module.css';

export interface TruncateProps {
  children: React.ReactNode;
  className?: string;
}

export function Truncate({children, className}: TruncateProps) {
  return (
    <span className={classNames(styles.Truncate, className)}>{children}</span>
  );
}
