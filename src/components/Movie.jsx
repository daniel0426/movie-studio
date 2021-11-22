import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'
import {gql, useMutation} from '@apollo/client';
import {GrLike, GrDislike} from 'react-icons/gr'

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id : Int!, $isLiked : Boolean! ){
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`

const Container = styled.div`
    
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  margin: 2em;
  @media (max-width: 1050px) {
  margin:2em 0;
  }
  @media (max-width: 1050px) {
    height: 360px;
  }
  @media (max-width: 750px) {
    height: 320px;
  }
  

`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  margin-bottom: 1em;
  transition: all 0.25s ease;
  &:hover{
    box-shadow: 8px 10px 20px -14px rgba(0,0,0,0.75);
  }
`;

const PosterInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const PosterTitle = styled.h1`
    font-size: 16px;
`
const Movie = ({id, bg, isLiked, title}) => {
    const [toggleMovie] = useMutation(LIKE_MOVIE, {variables: {id: +id, isLiked}})
    return (
        <Container>
          <Link to={`/${id}`}>
            <Poster bg={bg} />
          </Link>
          <PosterInfo>
              <PosterTitle> {title}  </PosterTitle>
             <button style={{background:'none', border:'none', fontSize:"16px",}} onClick={toggleMovie}>{isLiked ? <GrDislike /> : <GrLike />}</button>
          </PosterInfo>
        </Container>
      );
}

export default Movie
