import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

jest.mock('../../assets/Icons/icon-dublearrow-lefticons.svg', () => ({
  ReactComponent: () => <div data-testid="double-arrow-icon" />,
}));

jest.mock('../../assets/Icons/Home.svg', () => ({
  ReactComponent: () => <div data-testid="home-icon" />,
}));

jest.mock('../../assets/Icons/Places.svg', () => ({
  ReactComponent: () => <div data-testid="places-icon" />,
}));

jest.mock('../../assets/Icons/Reviews.svg', () => ({
  ReactComponent: () => <div data-testid="reviews-icon" />,
}));

jest.mock('../../assets/Icons/Users.svg', () => ({
  ReactComponent: () => <div data-testid="users-icon" />,
}));

jest.mock('../../assets/Icons/Project.svg', () => ({
  ReactComponent: () => <div data-testid="project-icon" />,
}));

jest.mock('../../assets/Icons/Volunteers.svg', () => ({
  ReactComponent: () => <div data-testid="volunteers-icon" />,
}));

Object.defineProperty(window, 'location', {
  writable: true,
  value: { assign: jest.fn() },
});

describe('Sidebar', () => {
  test('renders sidebar menu items', () => {
    render(<Sidebar />);

    // Check if the menu items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Lugares')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Projeto')).toBeInTheDocument();
    expect(screen.getByText('Voluntários')).toBeInTheDocument();
  });
  test('clicking on sidebar menu items navigates to the corresponding URL', () => {
    render(<Sidebar />);
    const homeMenuItem = screen.getByText('Home');
    const placesMenuItem = screen.getByText('Lugares');
    const reviewsMenuItem = screen.getByText('Reviews');
    const usersMenuItem = screen.getByText('Usuarios');
    const projectMenuItem = screen.getByText('Projeto');
    const volunteersMenuItem = screen.getByText('Voluntários');

    fireEvent.click(homeMenuItem);
    expect(window.location.assign).toBeCalledWith('/');

    fireEvent.click(placesMenuItem);
    expect(window.location.assign).toBeCalledWith('/lugares');

    fireEvent.click(reviewsMenuItem);
    expect(window.location.assign).toBeCalledWith('/reviews');

    fireEvent.click(usersMenuItem);
    expect(window.location.assign).toBeCalledWith('/usuarios');

    fireEvent.click(projectMenuItem);
    expect(window.location.assign).toBeCalledWith('/projeto');

    fireEvent.click(volunteersMenuItem);
    expect(window.location.assign).toBeCalledWith('/voluntarios');
  });
});
