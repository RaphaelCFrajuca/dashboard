import { ReactNode, useState } from 'react';
import { BasicSelect, ErrorMessage, LabelSelect } from './styled';
import { FieldError } from 'react-hook-form';
import Select from 'react-select';

type Option = { label: string; value: string };

interface ISelect {
	label?: ReactNode;
	error?: FieldError | undefined;
	options: Array<Option>;
	onChange: (value: Option) => void;
}

const SelectComponent = ({ label, error, options, onChange }: ISelect) => {
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
		<BasicSelect>
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
			{hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</BasicSelect>
	);
};

export { SelectComponent };
