import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing: 'now_playing'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
    airing_today: 'airing_today'
}

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (params) => {
        const url = 'search/multi';
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    recommendation: (cate, id) => {
        const url = category[cate] + '/' + id + '/recommendations';
        return axiosClient.get(url, {params: {}});
    },
    discover: (type, params) => {
        const url = 'discover/' + category[type];
        return axiosClient.get(url, params);
    },
    trendingAllDay: (params) => {
        const url = 'trending/all/day';
        return axiosClient.get(url, params);
    },
    movieTrending: (params) => {
        const url = 'trending/movie/day';
        return axiosClient.get(url, params);
    },
    tvTrending: (params) => {
        const url = 'trending/tv/day';
        return axiosClient.get(url, params);
    },
    genresList: (type, params) => {
        const url = `genre/${type}/list`;
        return axiosClient.get(url, params);
    },
    detailCredits: (id) => {
        const url =  'credits/' + id;
        return axiosClient.get(url, {params: {}});
    },
    videoDetails: (type, id) => {
        const url =  '/' + category[type] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    }
}

export default tmdbApi;