import React from 'react';

import {
  classNames,
  sanitizeCustomProperties,
  variationName,
} from '../../utilities/css';

import styles from './SkeletonDisplayText.module.css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
  /**
   * Maxium width of the text
   * @default '120px'
   */
  maxWidth?: `${number}ch` | `${number}%`;
  className?: string;
}

export function SkeletonDisplayText({
  size = 'medium',
  maxWidth,
  className,
}: SkeletonDisplayTextProps) {
  const classNameAll = classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
    className,
  );

  const style = {
    '--pc-skeleton-display-text-max-width': maxWidth ?? undefined,
  } as React.CSSProperties;

  return (
    <div className={classNameAll} style={sanitizeCustomProperties(style)} />
  );
}
