import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Login from '..';

describe('Login', () => {
  it('first render', () => {
    const component = render(<Login/>);
    expect(component).toMatchSnapshot();
  });
});
