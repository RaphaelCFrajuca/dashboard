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

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};


describe('Sidebar', () => {
  

  beforeEach(() => {
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders sidebar menu items', () => {
    window.location.href = '/reviews'
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
    window.location.href = '/reviews'
    render(<Sidebar />);
    const homeMenuItem = screen.getByText('Home');
    const placesMenuItem = screen.getByText('Lugares');
    const reviewsMenuItem = screen.getByText('Reviews');
    const usersMenuItem = screen.getByText('Usuarios');
    const projectMenuItem = screen.getByText('Projeto');
    const volunteersMenuItem = screen.getByText('Voluntários');

    fireEvent.click(homeMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/');

    fireEvent.click(placesMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/lugares');

    fireEvent.click(reviewsMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/reviews');

    fireEvent.click(usersMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/usuarios');

    fireEvent.click(projectMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/projeto');

    fireEvent.click(volunteersMenuItem);
    expect(window.location.assign).toHaveBeenCalledWith('/voluntarios');
  });

  test('updates mask position based on the current URL and sidebar expansion', () => {
    window.location.href = '/';
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '0');
    
    window.location.href = '/lugares';
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '69');
    
    // Update the URL and sidebar expansion state
   
    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '50');

    window.location.href = '/reviews';
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith('setMaskPosition', '138');
    
    // Update the URL and sidebar expansion state
   
    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '100');

    window.location.href = '/usuarios';
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '207');
    
    // Update the URL and sidebar expansion state
   
    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '150');

    window.location.href = '/projeto';
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '276');
    
    // Update the URL and sidebar expansion state
   
    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '200');

    window.location.href = '/voluntarios';
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '345');
    
    // Update the URL and sidebar expansion state
   
    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('setMaskPosition', '250');
   
    
  });

  test('updates isSidebarExpanded based on the click of a button', async() => {
    window.location.href = '/'
    localStorageMock.getItem.mockReturnValue('true');
    render(<Sidebar />);
    const toggle = await screen.getByTestId('double-arrow-icon');
    fireEvent.click(toggle);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('isSidebarExpanded', '');

    localStorageMock.getItem.mockReturnValue('');
    render(<Sidebar />);
    fireEvent.click(toggle);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('isSidebarExpanded', 'true');
    
  });
});