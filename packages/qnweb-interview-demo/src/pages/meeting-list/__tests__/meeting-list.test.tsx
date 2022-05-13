import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import MeetingList from '..';

describe('MeetingList', () => {
  it('first render', () => {
    const component = render(<MeetingList/>);
    expect(component).toMatchSnapshot();
  });
});
