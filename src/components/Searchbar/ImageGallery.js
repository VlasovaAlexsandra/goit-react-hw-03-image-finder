import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem'

const ImageGallery = ({ hits, showModal }) => {
    return (
        <ul className="ImageGallery"
        // onClick={this.toggleModal}
        >
            {hits.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    showModal={showModal}
                />)
            )}
        </ul>
    )
}

ImageGallery.propTypes = {
    showModal: PropTypes.func.isRequired,
    hits: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
    })),
}

export default ImageGallery