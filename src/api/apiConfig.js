const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f9f898c3d4845b9473702a3ba969983d',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    multiFaceW1920AndH800Image: (imgPath) => `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${imgPath}`,
    multiFacew1000AndH450Image: (imgPath) => `https://image.tmdb.org/t/p/w1000_and_h450_multi_faces${imgPath}`,
}

export default apiConfig;