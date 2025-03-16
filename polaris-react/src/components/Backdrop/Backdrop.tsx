import React from 'react';
import type {Dispatch, SetStateAction} from 'react';

import {classNames} from '../../utilities/css';
import {ScrollLock} from '../ScrollLock';

import styles from './Backdrop.module.css';

export interface BackdropProps {
  belowNavigation?: boolean;
  transparent?: boolean;
  onClick?(): void;
  onTouchStart?(): void;
  setClosing?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export function Backdrop(props: BackdropProps) {
  const {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing,
    className,
  } = props;

  const classNameAll = classNames(
    styles.Backdrop,
    belowNavigation && styles.belowNavigation,
    transparent && styles.transparent,
    className,
  );

  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };

  const handleClick = () => {
    if (setClosing) {
      setClosing(false);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <ScrollLock />
      <div
        className={classNameAll}
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onMouseDown={handleMouseDown}
      />
    </>
  );
}
