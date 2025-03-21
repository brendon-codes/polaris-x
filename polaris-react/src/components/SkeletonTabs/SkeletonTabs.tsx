import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './SkeletonTabs.module.css';

export interface SkeletonTabsProps {
  count?: number;
  /** Fit tabs to container */
  fitted?: boolean;
  className?: string;
}

export function SkeletonTabs({
  count = 2,
  fitted = false,
  className,
}: SkeletonTabsProps) {
  return (
    <div
      className={classNames(styles.Tabs, fitted && styles.fitted, className)}
    >
      {[...Array(count).keys()].map((key) => {
        return (
          <div key={key} className={classNames(styles.Tab)}>
            <div className={styles.TabText} />
          </div>
        );
      })}
    </div>
  );
}
