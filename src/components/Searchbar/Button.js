import PropTypes from 'prop-types';

const Button = ({ fetchHits }) => {
    return (
        <button
            type="button"
            className="Button"
            onClick={fetchHits}
        >Load more</button>
    )
}

Button.propTypes = {
    fetchHits: PropTypes.func.isRequired,
};

export default Button

