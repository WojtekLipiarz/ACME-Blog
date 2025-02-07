'use client';

import React, { useId } from 'react';
// styles
import { SelectContainer, SortSelect } from './Select.styles';

type Option = {
  id: string;
  value: string;
};
interface SelectProps {
  label: string;
  options: Option[];
  activeOption: string;
  onChange: (e: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  activeOption,
  onChange,
}) => {
  const selectId = useId();

  return (
    <SelectContainer>
      <label htmlFor={selectId}>{label} </label>

      <SortSelect
        id={selectId}
        value={activeOption || options[0].id}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option value={option.id}>{option.value}</option>
        ))}
      </SortSelect>
    </SelectContainer>
  );
};

export default Select;
