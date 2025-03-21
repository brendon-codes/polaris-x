import React, {useContext, useMemo, useRef, useState} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import type {ActionListItemDescriptor, ActionListSection} from '../../types';
import {Key} from '../../types';
import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '../../utilities/focus';
import {useI18n} from '../../utilities/i18n';
import {Box} from '../Box';
import {KeypressListener} from '../KeypressListener';
import {FilterActionsContext} from '../FilterActionsProvider';
import {TextField} from '../TextField';
import {Icon} from '../Icon';

import {Item, Section} from './components';
import type {ItemProps} from './components';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Allow users to filter items in the list. Will only show if more than 8 items in the list. The item content of every items must be a string for this to work */
  allowFiltering?: boolean;
  /** Filter label used as a placeholder in the search field */
  filterLabel?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
  className?: string;
  filterClassName?: string;
}

const FILTER_ACTIONS_THRESHOLD = 8;

export type ActionListItemProps = ItemProps;

export function ActionList({
  items,
  sections = [],
  actionRole,
  allowFiltering,
  onActionAnyItem,
  filterLabel,
  className,
  filterClassName,
}: ActionListProps) {
  const i18n = useI18n();
  const filterActions = useContext(FilterActionsContext);
  let finalSections: readonly ActionListSection[] = [];
  const actionListRef = useRef<HTMLDivElement & HTMLUListElement>(null);
  const [searchText, setSearchText] = useState('');

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const isFilterable = finalSections?.some((section) =>
    section.items.some((item) => typeof item.content === 'string'),
  );

  const hasMultipleSections = finalSections.length > 1;
  const elementRole =
    hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined;
  const elementTabIndex =
    hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined;

  const filteredSections = finalSections?.map((section) => ({
    ...section,
    items: section.items.filter(({content}) =>
      typeof content === 'string'
        ? content?.toLowerCase().includes(searchText.toLowerCase())
        : content,
    ),
  }));

  const sectionMarkup = filteredSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={typeof section.title === 'string' ? section.title : index}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
        isFirst={index === 0}
      />
    ) : null;
  });

  const handleFocusPreviousItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target as HTMLElement)) {
        wrapFocusPreviousFocusableMenuItem(
          actionListRef.current,
          evt.target as HTMLElement,
        );
      }
    }
  };

  const handleFocusNextItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target as HTMLElement)) {
        wrapFocusNextFocusableMenuItem(
          actionListRef.current,
          evt.target as HTMLElement,
        );
      }
    }
  };

  const listeners =
    actionRole === 'menuitem' ? (
      <>
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.DownArrow}
          handler={handleFocusNextItem}
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.UpArrow}
          handler={handleFocusPreviousItem}
        />
      </>
    ) : null;

  const totalFilteredActions = useMemo(() => {
    const totalSectionItems =
      filteredSections?.reduce(
        (acc: number, section) => acc + section.items.length,
        0,
      ) || 0;

    return totalSectionItems;
  }, [filteredSections]);

  const totalActions =
    finalSections?.reduce(
      (acc: number, section) => acc + section.items.length,
      0,
    ) || 0;

  const hasManyActions = totalActions >= FILTER_ACTIONS_THRESHOLD;

  return (
    <>
      {(allowFiltering || filterActions) && hasManyActions && isFilterable && (
        <Box
          padding="200"
          paddingBlockEnd={totalFilteredActions > 0 ? '0' : '200'}
          className={filterClassName}
        >
          <TextField
            clearButton
            labelHidden
            label={
              filterLabel
                ? filterLabel
                : i18n.translate('Polaris.ActionList.SearchField.placeholder')
            }
            placeholder={
              filterLabel
                ? filterLabel
                : i18n.translate('Polaris.ActionList.SearchField.placeholder')
            }
            autoComplete="off"
            value={searchText}
            onChange={(value) => setSearchText(value)}
            prefix={<Icon source={SearchIcon} />}
            onClearButtonClick={() => setSearchText('')}
          />
        </Box>
      )}
      <Box
        as={hasMultipleSections ? 'ul' : 'div'}
        ref={actionListRef}
        role={elementRole}
        tabIndex={elementTabIndex}
        className={className}
      >
        {listeners}
        {sectionMarkup}
      </Box>
    </>
  );
}

ActionList.Item = Item;
