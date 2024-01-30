import React, { useState } from 'react';
import { ReactComponent as DownIcon } from '../../../assets/Icons/Downicons.svg';
import * as Styled from './MonthDropdown.styles';

const MONTHS: { id: number; label: string }[] = [
  { id: 0, label: 'Janeiro' },
  { id: 1, label: 'Fevereiro' },
  { id: 2, label: 'Março' },
  { id: 3, label: 'Abril' },
  { id: 4, label: 'Maio' },
  { id: 5, label: 'Junho' },
  { id: 6, label: 'Julho' },
  { id: 7, label: 'Agosto' },
  { id: 8, label: 'Setembro' },
  { id: 9, label: 'Outubro' },
  { id: 10, label: 'Novembro' },
  { id: 11, label: 'Dezembro' },
];

interface Props {
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export function MonthDropdown({
  selectedMonth,
  setSelectedMonth,
}: Readonly<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleMonthSelection = (month: number) => {
    setSelectedMonth(month);
  };

  return (
    <Styled.DropdownContainer onClick={handleDropdownToggle}>
      <Styled.DropdownButton>
        <Styled.DropdownButtonTitle>
          {MONTHS[selectedMonth].label}
        </Styled.DropdownButtonTitle>
        <Styled.DowniconsContainer isOpen={false}>
          <DownIcon width={24} height={24} />
        </Styled.DowniconsContainer>
      </Styled.DropdownButton>
      {isDropdownOpen && (
        <Styled.DropdownMenu>
          {MONTHS.map((month) => {
            return (
              <Styled.DropdownButtonItem
                key={month.id}
                onClick={() => handleMonthSelection(month.id)}
              >
                {month.label}
              </Styled.DropdownButtonItem>
            );
          })}
        </Styled.DropdownMenu>
      )}
    </Styled.DropdownContainer>
  );
}
