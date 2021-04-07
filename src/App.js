import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar'
import ImageGallery from './components/Searchbar/ImageGallery'
import Button from './components/Searchbar/Button'
import Modal from './components/Searchbar/Modal'
import Spinner from './components/Searchbar/Loader'
import hitsApi from './services/hits-api'
import './styles.css'

class App extends Component {
  state = {
    hits: [],
    largeImageURL: '',
    currentPage: 1,
    searchQuery: '',
    showModal: false,
    isLoading: false,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits()
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null
    })
  }

  fetchHits = () => {
    const { currentPage, searchQuery } = this.state

    const options = { searchQuery, currentPage }

    this.setState({ isLoading: true })

    hitsApi
      .fetchHits(options)
      .then(hits => {
        // console.log(response.data.hits)
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1
        }))
      })
      .catch(error => this.setState({ error }))
      .finally(() => (this.setState({ isLoading: false }),
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        }))
      )

  }

  toggleModal = (largeImageURL) => {
    // console.log(largeImageURL)
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL
    }))
  }

  render() {
    const { hits, isLoading, error, showModal, largeImageURL } = this.state
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading

    return (

      <div className="App">

        {error && <h1>Ooooops....ERROR</h1>}

        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery showModal={this.toggleModal} hits={hits} />

        {/* <button type="button" onClick={this.toggleModal}>Open modal</button> */}

        {showModal && <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />}

        { isLoading && <Spinner />}

        {shouldRenderLoadMoreButton && <Button fetchHits={this.fetchHits}></Button>}

      </div>

    )
  }
}

export default App;
