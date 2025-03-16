import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {Image} from '../Image';
import {Icon} from '../Icon';

import styles from './Thumbnail.module.css';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Transparent background */
  transparent?: boolean;
  className?: string;
}

export function Thumbnail({
  source,
  alt,
  size = 'medium',
  transparent,
  className,
}: ThumbnailProps) {
  const classNameAll = classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
    transparent && styles.transparent,
    className,
  );

  const content =
    typeof source === 'string' ? (
      <Image alt={alt} source={source} />
    ) : (
      <Icon accessibilityLabel={alt} source={source} />
    );

  return <span className={classNameAll}>{content}</span>;
}
