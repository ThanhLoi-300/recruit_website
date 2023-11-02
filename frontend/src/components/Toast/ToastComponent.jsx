import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './style.css';

const ToastComponent = ({ message, type, fontSize }) => {
    const typeToast = type === 'success' ? 'bg-green' : 'bg-red';
    return (
        <div className={`toast ${typeToast}`}>
            {type === 'success' && <FaCheckCircle className="toast-icon success" />}
            {type === 'error' && <FaTimesCircle className="toast-icon error" />}
            <div>
                <p className="toast-message" style={{ fontSize: fontSize }}>
                    {message}
                </p>
            </div>
        </div>
    );
};

ToastComponent.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default ToastComponent;
