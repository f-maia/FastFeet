import styled from 'styled-components';
import { lighten } from 'polished';

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  & > div:not(:first-child) {
    margin-left: 16px;
  }
`;

const baseColor = '#7D40E7';
export const customStyle = {
  singleValue: (styles) => {
    return {
      ...styles,
      color: '#444',
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      position: 'unset',
      height: '45px',
    };
  },
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      border: isFocused ? `0 0 0 1px ${baseColor}` : '1px solid #ddd',
      borderColor: `${lighten(0.2, baseColor)}`,
      boxShadow: 'none',
      ':hover': {
        borderColor: `${lighten(0.2, baseColor)}`,
      },
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      background: '#fff',
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    let bg = null;
    if (isSelected) {
      bg = baseColor;
    } else if (isFocused) {
      bg = lighten(0.3, baseColor);
    }

    return {
      ...styles,
      backgroundColor: bg,
      color: isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? baseColor : lighten(0.2, baseColor),
      },
    };
  },
};
