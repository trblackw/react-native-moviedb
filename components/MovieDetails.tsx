import React from 'react';
import { MovieDetails as MovieDetailsType } from '../types';
import styled from 'styled-components/native';

interface Props {
   movie: MovieDetailsType;
   closePopover: () => void;
}

const MovieDetails: React.FC<Props> = ({ movie, closePopover }) => {
   return (
      <Container>
         <MovieTitle>{movie.Title}</MovieTitle>
         <Flex>
            <Attribute>{movie.BoxOffice}</Attribute>
            <Attribute>{movie.Rated}</Attribute>
            <Attribute>{movie.Metascore}%</Attribute>
         </Flex>
         <Text>{movie.Plot}</Text>
         <CloseButton onPress={closePopover}><Text>Close</Text></CloseButton>
      </Container>
   );
};

export default MovieDetails;

const Flex = styled.View`
   flex-direction: row;
   justify-content: space-evenly;
   align-items: center;
   width: 100%;
   padding: 5px 10px;
`;

const MovieTitle = styled.Text`
   font-size: 30px;
   font-weight: 800;
   color: whitesmoke;
`;

const Attribute = styled.Text`
   font-size: 20px;
   font-weight: 600;
   color: whitesmoke;
   margin: 15px 0;
`;

const Text = styled.Text`
   font-weight: 400;
   color: whitesmoke;
   font-size: 18px;
`;

const Container = styled.View`
   flex: 1;
   background-color: #223343;
   align-items: center;
   justify-content: flex-start;
   padding: 70px 15px 0 15px;
`;

const CloseButton = styled.TouchableHighlight`
  margin: 10px auto;
  border-radius: 5px;
  background-color: #445565;
  padding: 5px 7px;
`