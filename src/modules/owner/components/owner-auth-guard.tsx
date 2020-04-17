import * as React from 'react';
import { OwnerAuthStateContext } from '../owner.context';
import { OwnerLogin } from './owner-login';

export type OwnerAuthGuardProps = {
  children: React.ReactNode;
};

export const OwnerAuthGuard = (props: OwnerAuthGuardProps) => {
  const state = React.useContext(OwnerAuthStateContext);

  if (state.status === 'anonymous') {
    return <OwnerLogin />;
  }

  return <>{props.children}</>;
};
