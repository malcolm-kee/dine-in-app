import { copyText } from 'lib/copy';
import { callAll } from 'lib/fp';
import { useTransientState } from 'lib/use-transient-state';
import * as React from 'react';
import { Button, ButtonProps } from './button';

export type CopyButtonProps = Omit<ButtonProps, 'ref'> & {
  copiedText?: React.ReactNode;
  contentToCopy: string;
};

export const CopyButton = ({
  contentToCopy,
  copiedText = 'Copied!',
  children = 'Copy',
  onClick,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useTransientState(false);

  const handleCopy = () => {
    copyText(contentToCopy).then(() => setCopied(true));
  };

  return (
    <Button onClick={callAll(onClick, handleCopy)} {...props}>
      {copied ? copiedText : children}
    </Button>
  );
};
