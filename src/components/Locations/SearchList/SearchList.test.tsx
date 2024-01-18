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
const mockSetShowAddModal = jest.fn();
const mockSetPendingValidationFilter = jest.fn();
const mockSetIsFilteringByPendingValidation = jest.fn();

test('renders SearchList component correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      isFilteringByPendingValidation={false}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
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
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      isFilteringByPendingValidation={false}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const searchInput = getByPlaceholderText('Buscar');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
});

test('calls setShowAddModal when Add button is clicked', () => {
  const { getByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      isFilteringByPendingValidation={false}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const addButton = getByText('+ADD');
  fireEvent.click(addButton);

  expect(mockSetShowAddModal).toHaveBeenCalled();
});
