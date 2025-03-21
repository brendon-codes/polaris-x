import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './MessageIndicator.module.css';

export interface MessageIndicatorProps {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function MessageIndicator({
  children,
  active,
  className,
}: MessageIndicatorProps) {
  const indicatorMarkup = active && <div className={styles.MessageIndicator} />;

  return (
    <div className={classNames(styles.MessageIndicatorWrapper, className)}>
      {indicatorMarkup}
      {children}
    </div>
  );
}
