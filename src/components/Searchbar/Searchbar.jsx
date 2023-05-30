import { useState } from 'react';
import { oneOfType, string, number, func } from 'prop-types';
import { BiSearch as IconSearch } from 'react-icons/bi';
import { Header, SearchBtn, SearchForm } from './Searchbar.styled';
import TextField from 'components/TextField';

// извлекаем onChange, чтобы не перебивал (1) при прокидывании restProps (2)
const Searchbar = ({ width, height, onSubmit, onChange, ...restProps }) => {
  const [query, setQuery] = useState('');

  const handleSearchQueryChange = e => {
    const query = e?.target.value.trim() || '';
    setQuery(query);
    onChange && onChange(query, e);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit(query, e);
  };

  return (
    <Header>
      <SearchForm
        width={width}
        height={height || '70%'}
        onSubmit={handleFormSubmit}
      >
        <TextField
          autocomplete="off"
          placeholder="Search images..."
          onChange={handleSearchQueryChange} // (1)
          value={query}
          {...restProps} // (2)
        />
        <SearchBtn type="submit" disabled={!query}>
          <IconSearch size="95%" />
        </SearchBtn>
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  onSubmit: func,
  onChange: func,
};

export default Searchbar;
