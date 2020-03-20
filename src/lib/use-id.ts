import * as React from 'react';
import { getId } from './get-id';

export const useId = (providedId: string | undefined) => {
  const [fallbackId, setFallbackId] = React.useState(providedId);

  const result = providedId || fallbackId;

  React.useEffect(() => {
    if (!result) {
      setFallbackId(getId());
    }
  }, [result]);

  return result;
};
