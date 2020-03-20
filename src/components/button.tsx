import cx from 'classnames';
import * as React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: 'primary' | 'none';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { type = 'button', variant = 'primary', className, disabled, ...props },
    ref
  ) {
    return (
      <button
        type={type}
        className={cx(
          'inline-flex items-center justify-center rounded px-4 py-2',
          disabled
            ? 'bg-gray-500 text-gray-100 cursor-not-allowed'
            : variant === 'primary'
            ? 'bg-teal-500 text-gray-100 shadow'
            : '',
          className
        )}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
