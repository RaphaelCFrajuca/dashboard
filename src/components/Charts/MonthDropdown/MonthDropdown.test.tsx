import { render, fireEvent } from '@testing-library/react';
import { MonthDropdown } from './MonthDropdown';
import { DowniconsContainer } from './MonthDropdown.styles';

jest.mock('../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));

const mockSetSelectedMonth = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('should render the month dropdown', () => {
  const mockSelectedMonth = 0;

  const { getByText, getByRole, getByTestId } = render(
    <MonthDropdown
      selectedMonth={mockSelectedMonth}
      setSelectedMonth={mockSetSelectedMonth}
    />
  );

  const titleElement = getByText('Janeiro');
  const dropdownButton = getByRole('button');
  const icon = getByTestId('down-icon');

  expect(titleElement).toBeInTheDocument();
  expect(dropdownButton).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test('should open the dropdown when clicking on the month dropdown component', () => {
  const mockSelectedMonth = 0;

  const { getByRole, getByTestId } = render(
    <MonthDropdown
      selectedMonth={mockSelectedMonth}
      setSelectedMonth={mockSetSelectedMonth}
    />
  );

  const dropdownButton = getByRole('button');
  fireEvent.click(dropdownButton);

  const dropdownMenu = getByTestId('dropdown-menu');

  expect(dropdownMenu).toBeInTheDocument();
});

test('should close the dropdown when clicking twice on the month dropdown component', () => {
  const mockSelectedMonth = 0;

  const { getByRole, getByTestId } = render(
    <MonthDropdown
      selectedMonth={mockSelectedMonth}
      setSelectedMonth={mockSetSelectedMonth}
    />
  );

  const dropdownButton = getByRole('button');
  fireEvent.click(dropdownButton);

  const dropdownMenu = getByTestId('dropdown-menu');
  fireEvent.click(dropdownButton);

  expect(dropdownMenu).not.toBeInTheDocument();
});

test('should check that the rotation of the icon is 0deg when the dropdown menu is closed', () => {
  const { getByTestId } = render(
    <DowniconsContainer isOpen={false} data-testid="downicons-container" />
  );
  const containerClosed = getByTestId('downicons-container');
  expect(containerClosed).toHaveStyle(`
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
    transform: rotate(0deg);
  `);
});

test('should check that the rotation of the icon is 180deg when the dropdown menu is open', () => {
  const { getByTestId } = render(
    <DowniconsContainer isOpen={true} data-testid="downicons-container" />
  );
  const containerOpen = getByTestId('downicons-container');
  expect(containerOpen).toHaveStyle(`
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
    transform: rotate(180deg);
  `);
});

test('should display the months when the dropdown is open', () => {
  const mockSelectedMonth = 4;

  const { getByRole, getByTestId } = render(
    <MonthDropdown
      selectedMonth={mockSelectedMonth}
      setSelectedMonth={mockSetSelectedMonth}
    />
  );

  const dropdownButton = getByRole('button');
  fireEvent.click(dropdownButton);

  const dropdownMenu = getByTestId('dropdown-menu');

  const january = getByTestId('month-0');
  const february = getByTestId('month-1');
  const march = getByTestId('month-2');
  const april = getByTestId('month-3');
  const may = getByTestId('month-4');
  const june = getByTestId('month-5');
  const july = getByTestId('month-6');
  const august = getByTestId('month-7');
  const september = getByTestId('month-8');
  const october = getByTestId('month-9');
  const november = getByTestId('month-10');
  const december = getByTestId('month-11');

  expect(dropdownMenu).toBeInTheDocument();
  expect(january).toBeInTheDocument();
  expect(february).toBeInTheDocument();
  expect(march).toBeInTheDocument();
  expect(april).toBeInTheDocument();
  expect(may).toBeInTheDocument();
  expect(june).toBeInTheDocument();
  expect(july).toBeInTheDocument();
  expect(august).toBeInTheDocument();
  expect(september).toBeInTheDocument();
  expect(october).toBeInTheDocument();
  expect(november).toBeInTheDocument();
  expect(december).toBeInTheDocument();
});

test('should calls setSelectedMonth when clicking on a month', () => {
  const mockSelectedMonth = 3;

  const { getByRole, getByTestId, queryByText } = render(
    <MonthDropdown
      selectedMonth={mockSelectedMonth}
      setSelectedMonth={mockSetSelectedMonth}
    />
  );

  const dropdownButton = getByRole('button');
  fireEvent.click(dropdownButton);

  const dropdownMenu = getByTestId('dropdown-menu');

  const monthSelection = getByTestId('month-3');
  fireEvent.click(monthSelection);

  expect(mockSetSelectedMonth).toHaveBeenCalledWith(3);
  expect(mockSetSelectedMonth).toHaveBeenCalledTimes(1);
  expect(dropdownMenu).not.toBeInTheDocument();
  expect(queryByText('Abril')).toBeInTheDocument();
});
