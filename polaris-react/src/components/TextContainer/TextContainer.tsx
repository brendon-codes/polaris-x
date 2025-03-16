import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import styles from './TextContainer.module.css';

type Spacing = 'tight' | 'loose';

export interface TextContainerProps {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
  /** The content to render in the text container. */
  children?: React.ReactNode;
  className?: string;
}

/** @deprecated Use BlockStack instead */
export function TextContainer({
  spacing,
  children,
  className,
}: TextContainerProps) {
  const classNameAll = classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
    className,
  );
  return <div className={classNameAll}>{children}</div>;
}
