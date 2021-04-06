import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, showModal }) => {
    return (
        <li
            className="ImageGalleryItem"
            onClick={() => showModal(largeImageURL)}
        >
            <img
                src={webformatURL}
                alt={webformatURL}
                width="450"
                className="ImageGalleryItem-image"
                largeImageURL={largeImageURL}
            // showModal={showModal}
            // showModal={largeImageURL}
            >
            </img>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    showModal: PropTypes.func.isRequired,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string
};

export default ImageGalleryItem