import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  sanitizeCustomProperties,
  classNames,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Bleed.module.css';

type Spacing = ResponsiveProp<SpaceScale>;

export interface BleedProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** Negative horizontal space around children */
  marginInline?: Spacing;
  /** Negative vertical space around children */
  marginBlock?: Spacing;
  /** Negative top space around children */
  marginBlockStart?: Spacing;
  /** Negative bottom space around children */
  marginBlockEnd?: Spacing;
  /** Negative left space around children */
  marginInlineStart?: Spacing;
  /** Negative right space around children */
  marginInlineEnd?: Spacing;
  className?: string;
}

export const Bleed = ({
  marginInline,
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  className,
  children,
}: BleedProps) => {
  const getNegativeMargins = (direction: string) => {
    const xAxis = ['marginInlineStart', 'marginInlineEnd'];
    const yAxis = ['marginBlockStart', 'marginBlockEnd'];

    const directionValues: {[key: string]: Spacing | undefined} = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock,
    };

    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && marginBlock) {
      return directionValues.marginBlock;
    }
  };

  const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
  const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
  const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
  const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');

  const style = {
    ...getResponsiveProps(
      'bleed',
      'margin-block-start',
      'space',
      negativeMarginBlockStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-block-end',
      'space',
      negativeMarginBlockEnd,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-start',
      'space',
      negativeMarginInlineStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-end',
      'space',
      negativeMarginInlineEnd,
    ),
  } as React.CSSProperties;

  return (
    <div
      className={classNames(styles.Bleed, className)}
      style={sanitizeCustomProperties(style)}
    >
      {children}
    </div>
  );
};
