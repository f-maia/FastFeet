import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdAdd } from 'react-icons/md';

import history from '~/services/history';

import TableStyle, {
  Container,
  OptionsContainer,
  FiltersOption,
  SearchField,
  RegisterButton,
  Title,
  CheckboxField,
} from './styles';

export default function TablePage({
  title,
  partialTitle,
  checkbox,
  search,
  customStyle,
  headers,
  children,
}) {
  const [filter, setFilter] = useState('');
  const [timer, setTimer] = useState(null);

  function searchAfterStopTyping(value) {
    const timeout = setTimeout(() => {
      search(value);
      setTimer(null);
    }, 300);

    return timeout;
  }

  function handleInputChange(e) {
    const { value } = e.target;
    setFilter(value);

    if (timer) clearTimeout(timer);
    setTimer(searchAfterStopTyping(value));
  }

  function renderOptions() {
    return (
      <OptionsContainer>
        <FiltersOption>
          <SearchField>
            <MdSearch size={22} color="#999" />
            <input
              type="text"
              placeholder={`Buscar por ${partialTitle || title}`}
              value={filter}
              onChange={handleInputChange}
            />
          </SearchField>
          {!!checkbox && (
            <CheckboxField>
              <label htmlFor="checkbox">
                Exibir somente encomendas com problemas
              </label>
              <input
                name="checkbox"
                id="checkbox"
                type="checkbox"
                checked={checkbox.state}
                onChange={checkbox.handleChange}
              />
            </CheckboxField>
          )}
        </FiltersOption>
        <RegisterButton to={`${history.location.pathname}/create`}>
          <MdAdd size={22} color="#fff" />
          <span>CADASTRAR</span>
        </RegisterButton>
      </OptionsContainer>
    );
  }

  return (
    <Container>
      <TableStyle customStyle={customStyle} />
      <Title>{title || `Gerenciando ${partialTitle}`}</Title>
      {!!search && renderOptions()}

      <table>
        <thead>
          <tr>
            {headers.map((text) => (
              <th key={text}>{text}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </Container>
  );
}

TablePage.defaultProps = {
  title: '',
  partialTitle: '',
  search: null,
  customStyle: null,
  checkbox: null,
};

TablePage.propTypes = {
  title: PropTypes.string,
  partialTitle: PropTypes.string,
  checkbox: PropTypes.shape({
    handleChange: PropTypes.func,
    state: PropTypes.bool,
  }),
  search: PropTypes.func,
  customStyle: PropTypes.arrayOf(PropTypes.string),
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};
