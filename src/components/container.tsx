import cx from 'classnames';
import * as React from 'react';

export type ContainerProps = {
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl';
} & JSX.IntrinsicElements['div'];

export const Container = ({ maxWidth = 'md', ...props }: ContainerProps) => (
  <div
    {...props}
    className={cx(
      'mx-auto py-3 px-4 max-w',
      `max-w-${maxWidth}`,
      props.className
    )}
  />
);
