import cx from 'classnames';
import * as React from 'react';

export const Container = (props: JSX.IntrinsicElements['div']) => (
  <div
    {...props}
    className={cx('max-w-md mx-auto py-3 px-4', props.className)}
  />
);
