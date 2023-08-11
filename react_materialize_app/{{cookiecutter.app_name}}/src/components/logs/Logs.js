import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

//With Redux, the component receives app level state, and access to actions
// through its props. This is done through "connect" mapStateToProps, and by
// importing the actions (and passing them to connect)
const Logs = ({ logState: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || !logs) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  logState: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  logState: state.log,
});
const availableActions = {
  getLogs,
};
export default connect(mapStateToProps, availableActions)(Logs);
