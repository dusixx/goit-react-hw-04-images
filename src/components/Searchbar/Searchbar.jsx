import { Component } from 'react';
import { oneOfType, string, number, func } from 'prop-types';
import { BiSearch as IconSearch } from 'react-icons/bi';
import { Header, SearchBtn, SearchForm } from './Searchbar.styled';
import { TextField } from 'components/TextField';

export default class Searchbar extends Component {
  static propTypes = {
    width: oneOfType([string, number]),
    height: oneOfType([string, number]),
    onSubmit: func,
    onChange: func,
  };

  state = { searchQuery: '' };

  handleSearchQueryChange = e => {
    const { onChange } = this.props;
    const searchQuery = e?.target.value.trim() || '';
    this.setState({ searchQuery });
    onChange && onChange(e, searchQuery);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const searchQuery = this.state.searchQuery.trim();
    onSubmit && onSubmit(e, searchQuery);
  };

  render() {
    // извлекаем onChange, чтобы не перебивал текущий при прокидывании restProps (*)
    const { width, height, onChange, ...restProps } = this.props;
    const { handleSearchQueryChange, handleFormSubmit } = this;
    const { searchQuery } = this.state;

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
            onChange={handleSearchQueryChange}
            value={searchQuery}
            {...restProps} // (*)
          />
          <SearchBtn type="submit" disabled={!searchQuery}>
            <IconSearch size="95%" />
          </SearchBtn>
        </SearchForm>
      </Header>
    );
  }
}
