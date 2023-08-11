import M from 'materialize-css/dist/js/materialize.min.js';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog, clearCurrent } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ logState: { current }, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);
  const onSubmit = (e) => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const updatedLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date(),
      };
      updateLog(updatedLog);
      M.toast({ html: `Log updated by ${tech}` });
      //Clear fields
      clearCurrent();
    }
  };
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value={`${tech.firstName} ${tech.lastName}`} disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '75%',
  height: '75%',
};

EditLogModal.propTypes = {
  logState: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  logState: state.log,
});
const availableActions = {
  updateLog,
  clearCurrent,
};
export default connect(mapStateToProps, availableActions)(EditLogModal);
