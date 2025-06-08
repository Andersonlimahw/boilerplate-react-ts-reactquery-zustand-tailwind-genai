import { describe , expect, it } from 'vitest';
import { render } from '../../utils/tests';
import { ThemeSwitcher } from '.';


describe('ThemeSwitcher', () => { 
  it('snapshot', () => {
    const { asFragment } = render(<ThemeSwitcher />);
    expect(asFragment()).toMatchSnapshot();
  })
})