import { Container } from 'components/container';
import { SettingEditor } from 'modules/owner/components/setting-editor';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { homeUrl } from 'routes';

export const Manage = () => {
  return (
    <Container>
      <h1>Manage</h1>
      <SettingEditor />
      <div className="my-3">
        <Link to={homeUrl} className="text-teal-700">
          Back to Home
        </Link>
      </div>
    </Container>
  );
};
