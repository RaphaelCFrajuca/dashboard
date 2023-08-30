import { ReactNode, useState } from 'react';
import { BasicSelect, ErrorMessage, LabelSelect } from './styled';
import { FieldError } from 'react-hook-form';
import Select from 'react-select';
import StateManagedSelect from 'react-select';

export type Option = { label: string; value: string };

type ISelect = {
  label?: ReactNode;
  error?: FieldError | undefined;
  options: Array<Option>;
  onChange: (value: Option) => void;
  dataTestid?: string;
};

const SelectComponent = ({
  label,
  error,
  options,
  onChange,
  dataTestid,
}: ISelect) => {
  const hasError = !!error;
  const errorMessage = error?.message;
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
        value={selected}
        onChange={(value) => change(value)}
        isMulti={false}
        isSearchable={false}
        styles={{
          control: (base, state) => {
            let backgroundColor = '';
            let borderColor = '';
            if (state.isFocused && !hasError) {
              borderColor = '#6898c9';
            }
            if (hasError) {
              borderColor = '#eb3d3d';
              backgroundColor = '#ffe8e8';
            }
            return {
              ...base,
              backgroundColor,
              borderColor,
            };
          },
        }}
      />
      {hasError && (
        <ErrorMessage data-testid="input-error">{errorMessage}</ErrorMessage>
      )}
    </BasicSelect>
  );
};

export { SelectComponent };
