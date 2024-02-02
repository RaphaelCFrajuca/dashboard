import { render } from '@testing-library/react';
import { MonthDropdown } from './MonthDropdown';

jest.mock('../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));

const mockSetSelectedMonth = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('renders dropdown', () => {
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
