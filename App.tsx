import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MovieDetails as MovieDetailsType, MovieOverview } from './types';
import { TouchableHighlight } from 'react-native';
import MovieDetails from './components/MovieDetails';
//it's a free api -- don't be a dick
const apiUrl = 'http://www.omdbapi.com/?apikey=24a945bd';

const App: React.FC = (): JSX.Element => {
   const [search, setSearch] = useState<string>('');
   const [movies, setMovies] = useState<MovieOverview[]>([]);
   const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType>();

   const initiateSearch = async () => {
      try {
         const res = await fetch(apiUrl + `&s=${search}`);
         const { Search: results }: { Search: MovieOverview[] } = await res.json();
         setMovies(results);
      } catch (error) {
         console.log(error);
      }
   };

   const openPopup = async (movieId: string): Promise<void> => {
      try {
         const res = await fetch(`${apiUrl}&i=${movieId}`);
         const movieInfo: MovieDetailsType = await res.json();
         setSelectedMovie(movieInfo);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container>
         <Title>Movie DB</Title>
         <Search
            value={search}
            placeholder="Search for a movie..."
            onChangeText={(text: string) => setSearch(text)}
            onSubmitEditing={initiateSearch}
         />
         <MovieList>
            {movies.map(movie => (
               <TouchableHighlight onPress={() => openPopup(movie.imdbID)} key={movie.imdbID} style={{ flex: 1 }}>
                  <Movie>
                     <Poster source={{ uri: movie.Poster }} resizeMode="cover" />
                     <MovieHeader>{movie.Title}</MovieHeader>
                  </Movie>
               </TouchableHighlight>
            ))}
         </MovieList>
         <Modal animated={true} animationType="fade" transparent={false} visible={!!selectedMovie}>
            <MovieDetails movie={selectedMovie} closePopover={() => setSelectedMovie(undefined)} />
         </Modal>
      </Container>
   );
};

export default App;

const Container = styled.View`
   flex: 1;
   background-color: #223343;
   align-items: center;
   justify-content: flex-start;
   padding: 70px 15px 0 15px;
`;

const Title = styled.Text`
   color: white;
   font-size: 32px;
   text-align: center;
   font-weight: 800;
   margin-bottom: 20px;
`;

const Search = styled.TextInput`
   font-size: 20px;
   font-weight: 300;
   padding: 20px;
   width: 100%;
   background-color: whitesmoke;
   border-radius: 5px;
`;

const MovieList = styled.ScrollView`
   flex: 1;
   padding: 10px 15px;
`;

const Movie = styled.View`
   flex: 1;
   width: 100%;
   margin-bottom: 20px;
   background-color: #445565;
   border-radius: 7px;
`;

const MovieHeader = styled.Text`
   font-size: 18px;
   font-weight: 700;
   color: #f1f3f4;
   padding: 20px;
`;

const Poster = styled.Image`
   width: 300px;
   height: 300px;
`;

const Modal = styled.Modal``;
