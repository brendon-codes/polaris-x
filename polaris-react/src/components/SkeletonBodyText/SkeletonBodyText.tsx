import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './SkeletonBodyText.module.css';

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
  className?: string;
}

export function SkeletonBodyText({
  lines = 3,
  className,
}: SkeletonBodyTextProps) {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<div className={styles.SkeletonBodyText} key={i} />);
  }

  return (
    <div className={classNames(styles.SkeletonBodyTextContainer, className)}>
      {bodyTextLines}
    </div>
  );
}
