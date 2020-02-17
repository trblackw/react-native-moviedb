import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {Movie} from "./types";
//it's a free api -- don't be a dick
const apiUrl = 'http://www.omdbapi.com/?apikey=24a945bd';

const App: React.FC = (): JSX.Element => {
   const [search, setSearch] = useState<string>('');
   const [movies, setMovies] = useState<Movie[]>([]);

   useEffect(() => {
      console.log(movies);
   }, [movies]);

   const initiateSearch = async () => {
      try {
         const res = await fetch(apiUrl + `&s=${search}`);
         const { Search: results }: { Search: Movie[] } = await res.json();
         setMovies(results);
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
      </Container>
   );
};

export default App;

const Container = styled.View`
   flex: 1;
   background-color: #0f4c75;
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
   background-color: aliceblue;
   border-radius: 5px;
`;
