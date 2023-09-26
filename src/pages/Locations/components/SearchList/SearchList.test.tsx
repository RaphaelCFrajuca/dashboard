import { render, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';

jest.mock('../../../../assets/Icons/Filtericons.svg', () => ({
  ReactComponent: 'FilterIcon',
}));
jest.mock('../../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: 'DownIcon',
}));
jest.mock('../../../../assets/Icons/SearchIcon.svg', () => ({
  ReactComponent: 'SearchIcon',
}));

const mockSetSearchTerm = jest.fn();
const mockOnOpenAddModal = jest.fn();

test('renders SearchList component correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <SearchList
      onOpenAddModal={mockOnOpenAddModal}
      setSearchTerm={mockSetSearchTerm}
    />
  );

  const titleElement = getByText('Locais');
  expect(titleElement).toBeInTheDocument();

  const searchInput = getByPlaceholderText('Buscar');
  expect(searchInput).toBeInTheDocument();
});

test('calls setSearchTerm when search input changes', () => {
  const { getByPlaceholderText } = render(
    <SearchList
      onOpenAddModal={mockOnOpenAddModal}
      setSearchTerm={mockSetSearchTerm}
    />
  );

  const searchInput = getByPlaceholderText('Buscar');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
});

test('calls onOpenAddModal when Add button is clicked', () => {
  const { getByText } = render(
    <SearchList
      onOpenAddModal={mockOnOpenAddModal}
      setSearchTerm={mockSetSearchTerm}
    />
  );

  const addButton = getByText('+ADD');
  fireEvent.click(addButton);

  expect(mockOnOpenAddModal).toHaveBeenCalled();
});
