import { Component } from "react";
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {
    componentDidMount() {
        // console.log('Modal componentDidMount')
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        // console.log('Modal componentWillUnmount')
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            // console.log('down ESC, close modal')
            this.props.onClose()
        }
    }

    handleBackdropClick = event => {
        // console.log('backdrop')
        if (event.currentTarget === event.target) {
            this.props.onClose()
        }
    }

    render() {
        const { largeImageURL } = this.props
        return createPortal(
            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal">
                    <img src={largeImageURL} alt={largeImageURL} />
                </div>
            </div>, modalRoot
        )
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string
}

export default Modal