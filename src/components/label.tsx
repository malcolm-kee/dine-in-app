import cx from 'classnames';
import * as React from 'react';

/**
 * Label is just a wrapper around html `label` element.
 *
 * It accepts all props `label` element accepts.
 *
 */
export function Label({ className, ...props }: JSX.IntrinsicElements['label']) {
  return <label className={cx('pl-2 leading-loose', className)} {...props} />;
}
