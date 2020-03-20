import cx from 'classnames';
import * as React from 'react';
import { callAll } from '../lib/fp';

export type InputProps = JSX.IntrinsicElements['input'] & {
  onChangeValue?: (value: string) => void;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      onChange,
      onChangeValue,
      className,
      readOnly,
      disabled,
      ...props
    }: InputProps,
    ref
  ) {
    return (
      <input
        {...props}
        className={cx(
          'block m-0 w-full min-w-0 border border-gray-300 px-3 py-1 shadow-inner text-gray-900 rounded-lg',
          readOnly || disabled ? 'bg-gray-200' : 'bg-white',
          className
        )}
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.value))
        )}
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
