import ReachAlert from '@reach/alert';
import cx from 'classnames';
import * as React from 'react';

export type AlertProps = React.ComponentPropsWithRef<typeof ReachAlert> & {
  variant?: 'error';
};

export const Alert = ({ variant, className, ...props }: AlertProps) => (
  <ReachAlert
    className={cx(
      'pl-2 pr-4 py-2 rounded border-l-4',
      variant === 'error' ? 'bg-red-200 border-red-800' : 'border-gray-700',
      className
    )}
    {...props}
  />
);
