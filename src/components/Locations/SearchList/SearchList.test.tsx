import { render, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';

jest.mock('../../../assets/Icons/Closeicons.svg', () => ({
  ReactComponent: () => <div data-testid="close-icon" />,
}));
jest.mock('../../../assets/Icons/Filtericons.svg', () => ({
  ReactComponent: () => <div data-testid="filter-icon" />,
}));
jest.mock('../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));
jest.mock('../../../assets/Icons/SearchIcon.svg', () => ({
  ReactComponent: () => <div data-testid="search-icon" />,
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

test('should render the filter component correctly', () => {
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

  const filterElement = getByText('Filtro');
  expect(filterElement).toBeInTheDocument();
});

test('should display the dropdown menu with the filter options, when click on the filter component', () => {
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

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByText('Aprovado');
  const filterPendingOption = getByText('Pendente');

  expect(filterAprovedOption).toBeInTheDocument();
  expect(filterPendingOption).toBeInTheDocument();
});

test('should remove the dropdown menu with the filter options, when click on the filter component', () => {
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

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByText('Aprovado');
  const filterPendingOption = getByText('Pendente');

  expect(filterAprovedOption).toBeInTheDocument();
  expect(filterPendingOption).toBeInTheDocument();

  fireEvent.click(filterElement);

  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
});
