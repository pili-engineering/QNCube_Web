import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import DeviceTest from '..';

describe('DeviceTest', () => {
  it('first render', () => {
    const component = render(<DeviceTest/>);
    expect(component).toMatchSnapshot();
  });
});
