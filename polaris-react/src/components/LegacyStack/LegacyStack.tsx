import React, {memo} from 'react';
import type {NamedExoticComponent} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren, wrapWithComponent} from '../../utilities/components';

import {Item} from './components';
import styles from './LegacyStack.module.css';

type Spacing =
  | 'extraTight'
  | 'tight'
  | 'baseTight'
  | 'loose'
  | 'extraLoose'
  | 'none';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

type Distribution =
  | 'equalSpacing'
  | 'leading'
  | 'trailing'
  | 'center'
  | 'fill'
  | 'fillEvenly';

export interface LegacyStackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
  /** Adjust horizontal alignment of elements */
  distribution?: Distribution;
  className?: string;
}
/** @deprecated Use the BlockStack component instead */
export const LegacyStack = memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap,
  className,
}: LegacyStackProps) {
  const classNameAll = classNames(
    styles.LegacyStack,
    vertical && styles.vertical,
    spacing && styles[variationName('spacing', spacing)],
    distribution && styles[variationName('distribution', distribution)],
    alignment && styles[variationName('alignment', alignment)],
    wrap === false && styles.noWrap,
    className,
  );

  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {key: index};
    return wrapWithComponent(child, Item, props);
  });

  return <div className={classNameAll}>{itemMarkup}</div>;
}) as NamedExoticComponent<LegacyStackProps> & {
  Item: typeof Item;
};

LegacyStack.Item = Item;
