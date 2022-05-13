import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import MeetingEntrance from '..';

describe('MeetingEntrance', () => {
  it('first render', () => {
    const history = createBrowserHistory()
    const component = render(
      <Router history={history}>
        <MeetingEntrance />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });
});
