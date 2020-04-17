import { noop } from 'lib/fp';
import * as React from 'react';
import { RequestOptions } from 'type/base-type';

export type AuthStatus = 'authenticated' | 'anonymous';

export type OwnerAuthState = {
  status: AuthStatus;
  accessToken: string;
};

const ACCESS_TOKEN_STORAGE_KEY = 'ACCESS_TOKEN_STORAGE_KEY';

const storedAccessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const OwnerAuthStateContext = React.createContext<OwnerAuthState>({
  status: 'anonymous',
  accessToken: '',
});
OwnerAuthStateContext.displayName = 'OwnerAuthStateContext';

type OwnerAuthActions =
  | {
      type: 'login';
      accessToken: string;
    }
  | {
      type: 'logout';
    };

export type OwnerAuthDispatch = React.Dispatch<OwnerAuthActions>;

export const OwnerAuthDispatchContext = React.createContext<OwnerAuthDispatch>(
  noop
);
OwnerAuthDispatchContext.displayName = 'OwnerAuthDispatchContext';

const authReducer: React.Reducer<OwnerAuthState, OwnerAuthActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        accessToken: action.accessToken,
      };

    case 'logout':
      return {
        ...state,
        status: 'anonymous',
        accessToken: '',
      };

    default:
      throw new Error(`Unknown auth action ${(action as any).type}`);
  }
};

export const OwnerProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(
    authReducer,
    storedAccessToken,
    (accessToken): OwnerAuthState =>
      accessToken
        ? {
            status: 'authenticated',
            accessToken,
          }
        : {
            status: 'anonymous',
            accessToken: '',
          }
  );

  React.useEffect(() => {
    if (state.status === 'authenticated') {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, state.accessToken);
    }
  }, [state]);

  return (
    <OwnerAuthStateContext.Provider value={state}>
      <OwnerAuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </OwnerAuthDispatchContext.Provider>
    </OwnerAuthStateContext.Provider>
  );
};

export const useWithAuthHeader = <Data, Return>(
  apicall: (data: Data, options: RequestOptions) => Return
) => {
  const { accessToken } = React.useContext(OwnerAuthStateContext);
  const result = React.useCallback(
    (data: Data) =>
      apicall(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [apicall, accessToken]
  );
  return result;
};
