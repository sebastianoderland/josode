import PropTypes from "prop-types";

function Text({ name, label, placeholder, autoComplete, value, onChange, error }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                name={name}
                autoComplete={autoComplete}
                onChange={onChange}
                value={value}
            />
            {error && (
                <div className="error-message" role="alert" aria-live="polite">
                    {error}
                </div>
            )}
        </div>
    );
}

Text.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default Text;
