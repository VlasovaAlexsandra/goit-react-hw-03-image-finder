import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar'
import hitsApi from './services/hits-api'
import './styles.css'

// // const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
// axios.defaults.headers.common['Authorization'] =
//   '20282142-3926486b0d0a2f754919f4d11';

class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImageURL: ''

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

    hitsApi.fetchHits(options)
      .then(hits => {
        // console.log(response.data.hits)
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1
        }))
      }).catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }))

  }

  render() {
    const { hits, isLoading, error } = this.state
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading

    return (

      <>
        {error && <h1>Ooooops....ERROR</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />

        <ul className="ImageGallery">
          {hits.map(({ id, webformatURL, tags }) => (
            <li key={id} className="ImageGalleryItem">
              <img src={webformatURL} alt={tags} width="450" className="ImageGalleryItem-image"></img>
            </li>
          ))}
        </ul>

        {isLoading && <h1>Loading...</h1>}

        {shouldRenderLoadMoreButton && (
          <button
            type="button"
            onClick={this.fetchHits}
          >Load more</button>
        )}


      </>

    )
  }
}

export default App;
