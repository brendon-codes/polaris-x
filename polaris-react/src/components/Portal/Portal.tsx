import {themeNameDefault} from '@shopify/polaris-tokens';
import React, {useEffect, useId} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';
import {useThemeName} from '../../utilities/use-theme';
import {ThemeProvider, isThemeNameLocal} from '../ThemeProvider';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
  className?: string;
}

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
  className,
}: PortalProps) {
  const themeName = useThemeName();
  const {container} = usePortalsManager();

  const uniqueId = useId();
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(
        <ThemeProvider
          theme={isThemeNameLocal(themeName) ? themeName : themeNameDefault}
          data-portal-id={portalId}
          className={className}
        >
          {children}
        </ThemeProvider>,
        container,
      )
    : null;
}

function noop() {}
