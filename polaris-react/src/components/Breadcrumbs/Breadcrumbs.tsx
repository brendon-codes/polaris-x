import React from 'react';
import {ArrowLeftIcon} from '@shopify/polaris-icons';

import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Button} from '../Button';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
  className?: string;
}

export function Breadcrumbs({backAction, className}: BreadcrumbsProps) {
  const {content} = backAction;

  return (
    <Button
      key={content}
      url={'url' in backAction ? backAction.url : undefined}
      onClick={'onAction' in backAction ? backAction.onAction : undefined}
      onPointerDown={handleMouseUpByBlurring}
      icon={ArrowLeftIcon}
      accessibilityLabel={backAction.accessibilityLabel ?? content}
      className={className}
    />
  );
}
