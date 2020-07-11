import * as React from 'react';

export const useQueueState = <Item>(
  initialState: Item[] | (() => Item[]),
  { size = 4, reverse = false }: { size?: number; reverse?: boolean }
) => {
  const [state, setState] = React.useState(initialState);
  const queue = React.useCallback(
    (item: Item) => {
      setState((prevState) => {
        const currentState =
          prevState.length >= size
            ? reverse
              ? prevState.slice(0, -1)
              : prevState.slice(1)
            : prevState;
        return reverse
          ? [item].concat(currentState)
          : currentState.concat(item);
      });
    },
    [size, reverse]
  );
  const clear = React.useCallback(() => setState([]), []);

  return [state, queue, clear] as const;
};
