import * as React from 'react';
import { callAll } from '../lib/fp';
import { useId } from '../lib/use-id';
import { Input, InputProps } from './input';
import { Label } from './label';

export type TextFieldProps = InputProps & {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  showHelpTextWhenFocus?: boolean;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, helpText, showHelpTextWhenFocus, ...props },
    ref
  ) {
    const displayedId = useId(props.id);

    const [isFocused, setIsFocused] = React.useState(false);

    const shouldShowHelpText = showHelpTextWhenFocus ? isFocused : !!helpText;

    return (
      <div>
        {label && <Label htmlFor={displayedId}>{label}</Label>}
        <Input
          {...props}
          id={displayedId}
          aria-describedby={helpText ? `${displayedId}-help` : undefined}
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
  }
);
