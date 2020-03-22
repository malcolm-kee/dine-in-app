import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Router } from 'react-router-dom';

export const renderWithRouter = (
  ui: React.ReactNode,
  { initialRoute = '/' } = {}
) => {
  const history = createMemoryHistory({
    initialEntries: [initialRoute],
  });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => Promise<void>
): (...args: Arg) => Promise<undefined>;
function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => void
): (...args: Arg) => void;
function wrapAct<Arg extends any[]>(action: (...args: Arg) => any) {
  return function invokeAct(...args: Arg) {
    return act(() => action(...args));
  };
}

export const user = {
  click: wrapAct(userEvent.click),
  dblClick: wrapAct(userEvent.dblClick),
  type: wrapAct(userEvent.type),
  selectOptions: wrapAct(userEvent.selectOptions),
};
