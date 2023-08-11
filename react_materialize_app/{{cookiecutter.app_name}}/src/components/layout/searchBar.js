import React, { useState } from 'react';
import { searchLogs } from '../../actions/logActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchBar = ({ searchLogs }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const search = (text) => {
    setSearchQuery(text);
    searchLogs(text);
  };
  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              onChange={(e) => search(e.target.value)}
              placeholder='Search logs...'
              value={searchQuery}
              required
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i
              className='material-icons'
              onClick={() => {
                search('');
              }}
            >
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};

const availableActions = {
  searchLogs,
};
export default connect(null, availableActions)(SearchBar);
