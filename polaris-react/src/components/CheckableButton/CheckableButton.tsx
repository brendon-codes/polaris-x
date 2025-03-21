import React, {useRef, useImperativeHandle, forwardRef} from 'react';

import {classNames} from '../../utilities/css';
import type {CheckboxHandles} from '../../types';
import {Checkbox} from '../Checkbox';
import {Text} from '../Text';

import styles from './CheckableButton.module.css';

export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  onToggleAll?(): void;
  ariaLive?: 'off' | 'polite';
  className?: string;
}

export const CheckableButton = forwardRef(function CheckableButton(
  {
    accessibilityLabel,
    label = '',
    onToggleAll,
    selected,
    disabled,
    ariaLive,
    className,
  }: CheckableButtonProps,
  ref,
) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  function focus() {
    checkBoxRef?.current?.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus,
    };
  });

  return (
    <div
      className={classNames(styles.CheckableButton, className)}
      onClick={onToggleAll}
    >
      <div className={styles.Checkbox}>
        <Checkbox
          label={accessibilityLabel}
          labelHidden
          checked={selected}
          disabled={disabled}
          onChange={onToggleAll}
          ref={checkBoxRef}
        />
      </div>
      {label ? (
        <span className={styles.Label} aria-live={ariaLive}>
          <Text as="span" variant="bodySm" fontWeight="medium">
            {label}
          </Text>
        </span>
      ) : null}
    </div>
  );
});
