import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import styles from './SkeletonThumbnail.module.css';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
  className?: string;
}

export function SkeletonThumbnail({
  size = 'medium',
  className,
}: SkeletonThumbnailProps) {
  const classNameAll = classNames(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)],
    className,
  );

  return <div className={classNameAll} />;
}
