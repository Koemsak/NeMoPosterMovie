const useGenres = (selectedGenre) => {
    if (selectedGenre.length < 1) return "";
    const genreId = selectedGenre.map((genre) => genre.id);
    return genreId.reduce((acc, curr) => acc+","+curr );
}

export default useGenres;