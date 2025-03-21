import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import {Item} from './components';
import styles from './List.module.css';

type Type = 'bullet' | 'number';

type Spacing = 'extraTight' | 'loose';

export interface ListProps {
  /**
   * Determines the space between list items
   * @default 'loose'
   */
  gap?: Spacing;
  /**
   * Type of list to display
   * @default 'bullet'
   */
  type?: Type;
  /** List item elements */
  children?: React.ReactNode;
  className?: string;
}

export const List: React.FunctionComponent<ListProps> & {
  Item: typeof Item;
} = function List({
  children,
  gap = 'loose',
  type = 'bullet',
  className,
}: ListProps) {
  const classNameAll = classNames(
    styles.List,
    gap && styles[variationName('spacing', gap)],
    type && styles[variationName('type', type)],
    className,
  );

  const ListElement = type === 'bullet' ? 'ul' : 'ol';
  return <ListElement className={classNameAll}>{children}</ListElement>;
};

List.Item = Item;
