import React from 'react';
import type {BorderWidthScale, ColorBorderAlias} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './Divider.module.css';

export interface DividerProps {
  /**
   * Divider border color
   * @default 'border-secondary'
   */
  borderColor?: ColorBorderAlias | 'transparent';
  /**
   * Divider border width
   * @default '025'
   */
  borderWidth?: BorderWidthScale;
  className?: string;
}

export const Divider = ({
  borderColor = 'border-secondary',
  borderWidth = '025',
  className,
}: DividerProps) => {
  const borderColorValue =
    borderColor === 'transparent'
      ? borderColor
      : `var(--p-color-${borderColor})`;

  return (
    <hr
      className={classNames(styles.Divider, className)}
      style={{
        borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`,
      }}
    />
  );
};
