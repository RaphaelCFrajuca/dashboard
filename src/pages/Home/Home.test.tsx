import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('HomePage', () => {
  it('renders "Home" text inside a div', () => {
    render(<Home />);
    const homeText = screen.getByText(/home/i);
    expect(homeText).toBeInTheDocument();
    expect(homeText.tagName).toBe('DIV');
  });
});
