import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './SettingAction.module.css';

export interface SettingActionProps {
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function SettingAction({
  action,
  children,
  className,
}: SettingActionProps) {
  return (
    <div className={classNames(styles.SettingAction, className)}>
      <div className={styles.Setting}>{children}</div>
      <div className={styles.Action}>{action}</div>
    </div>
  );
}
