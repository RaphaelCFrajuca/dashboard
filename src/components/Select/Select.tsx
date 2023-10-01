import { ReactNode, useState } from 'react';
import { BasicSelect, ErrorMessage, LabelSelect } from './styled';
import { useEffect } from 'react';
import { FieldError, set } from 'react-hook-form';
import Select from 'react-select';
import StateManagedSelect from 'react-select';

export type Option = { label: string; value: string };

type ISelect = {
  label?: ReactNode;
  error?: FieldError | undefined;
  options: Array<Option>;
  previousValue?: Option | null;
  onChange: (value: Option) => void;
  dataTestid?: string;
};

const SelectComponent = ({
  label,
  error,
  options,
  onChange,
  dataTestid,
  previousValue,
}: ISelect) => {
  const hasError = !!error;
  const [selected, setSelected] = useState<Option | null>(null);

  const change = (value: Option | null) => {
    if (value) {
      setSelected(value);
      onChange(value);
    }
  };
  

  return (
    <BasicSelect data-testid={dataTestid}>
      <LabelSelect hasError={hasError}>{label}</LabelSelect>
      <Select
        options={options}
        value={!selected ? previousValue : selected}
        onChange={(value) => change(value)}
        isMulti={false}
        isSearchable={false}
        styles={{
          control: (base, state) => {
            let fontWeight = 400;
            let borderColor = '#9D8DF4';
            let borderWidth = '1px';
            if (state.isFocused && !hasError) {
              borderColor = '#6200EE';
              fontWeight = 600;
              borderWidth = '0.2px';
            }
            if (hasError) {
              borderColor = '#eb3d3d';
            }
            return {
              ...base,
              borderColor,
              fontWeight,
              borderWidth,
            };
          },
          option: (base) => ({
            ...base,
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: '#9D8DF4',
              color: 'white',
            },
          }),
        }}
      />
      {hasError && (
        <ErrorMessage data-testid="input-error">
          Selecione um valor
        </ErrorMessage>
      )}
    </BasicSelect>
  );
};

export { SelectComponent };
