import cx from 'classnames';
import * as React from 'react';
import { callAll } from '../lib/fp';
import { useId } from '../lib/use-id';
import { Label } from './label';

export type SelectFieldProps = React.ComponentPropsWithoutRef<'select'> & {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  showHelpTextWhenFocus?: boolean;
  onChangeValue?: (value: string) => void;
};

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(function SelectField(
  { label, helpText, showHelpTextWhenFocus, onChangeValue, ...props },
  ref
) {
  const displayedId = useId(props.id);

  const [isFocused, setIsFocused] = React.useState(false);

  const shouldShowHelpText = showHelpTextWhenFocus ? isFocused : !!helpText;

  return (
    <div>
      {label && <Label htmlFor={displayedId}>{label}</Label>}
      <select
        {...props}
        id={displayedId}
        className={cx(
          'block m-0 w-full min-w-0 border border-gray-300 px-3 py-2 shadow-inner',
          props.className
        )}
        aria-describedby={helpText ? `${displayedId}-help` : undefined}
        onChange={callAll(
          props.onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        onFocus={callAll(props.onFocus, () => setIsFocused(true))}
        onBlur={callAll(props.onBlur, () => setIsFocused(false))}
        ref={ref}
      />
      {shouldShowHelpText && (
        <p id={`${displayedId}-help`} className="pl-2">
          <small>{helpText}</small>
        </p>
      )}
    </div>
  );
});
