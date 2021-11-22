import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      title
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
background-color: #4c4177;
background-image: linear-gradient(315deg, #4c4177 0%, #2a5470 74%);
  /* background-image: linear-gradient(-45deg, #d754ab, #fd723a); */
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 1050px) {
    height: 32vh
  }
  @media (max-width: 750px) {
    font-size: 28vh;
  }
  @media (max-width: 500px) {
    font-size: 20vh;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
  @media (max-width: 1050px) {
    font-size: 48px;
  }
  @media (max-width: 750px) {
    font-size: 42px;
  }
  @media (max-width: 500px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.h3`
  font-size: 36px;
  @media (max-width: 1050px) {
    font-size: 32px;
  }
  @media (max-width: 750px) {
    font-size: 28px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 20px;
`;

const Movies = styled.div`
  
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  margin: 2em  auto 4em auto;
  position: relative;
  top: 0px;
  @media (max-width: 1050px) {
   grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 700px) {
   grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 450px) {
   grid-template-columns: repeat(1, 1fr);
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title> Movie Studio</Title>
        <Subtitle>We love movies</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            isLiked={movie.isLiked}
            bg={movie.medium_cover_image}
            title={movie.title}
          />
        ))}
      </Movies>
    </Container>
  );
};

export default Home;
