import axios from 'axios';

const apiKey = '20282142-3926486b0d0a2f754919f4d11';

const fetchHits = ({ searchQuery = '', currentPage = 1 }) => {
    return (axios
        .get(
            `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${apiKey}`,
        ).then(response => response.data.hits)
    )
}

export default { fetchHits }