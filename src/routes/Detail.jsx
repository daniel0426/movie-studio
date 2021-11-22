import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Suggestion from "../components/Suggestion";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      language
      rating
      isLiked @client
    }

    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const DetailContainer =styled.div`
display: flex;
flex-direction: column;
height: 100%;
@media (min-width: 1050px) {
    height: 100vh;
  }
`
const Container = styled.div`
  box-sizing: border-box;
  background-color: #4c4177;
background-image: linear-gradient(315deg, #4c4177 0%, #2a5470 74%);
  width: 100%;
  padding: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  @media (max-width: 1050px) {
    flex-direction: column-reverse;
    padding: 1em;
  }
`;
const GoHome = styled.button`
  padding: 0.3em 0.5em;
  border-radius: 5px;
  color: #4c4177;
  font-size: 16px;
  font-weight: border;
  border: 1px solid red;
  text-decoration: none;
  border: none;
  outline: none;
  position: absolute;
  top: 5%;
  left: 5%;
  cursor: pointer;
`;

const Column = styled.div`
  /* flex: 1; */
  margin: 2em;
  margin-left: 10px;
  width: 50%;
  @media (max-width: 1050px) {
    margin: 5em 1em;
    width: 90%;
  }
  @media (max-width: 700px) {
    margin: 3em 1em;
    width: 90%;
  }
  @media (max-width: 550px) {
    margin: 2em 1em;
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 15px;
  text-align: center;
  margin-bottom: 1.5em;
  @media (max-width: 1050px) {
    font-size: 24px;
  }
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  text-transform: capitalize;
  text-align: right;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 24px;
  width: 80%;
  margin: 2em auto;
  @media (max-width: 1050px) {
    font-size: 18px;
    line-height: 22px;
    width: 90%;
  }
  @media (max-width: 750px) {
    font-size: 16px;
    line-height: 20px;
    width: 95%;
  }
`;

const SuggestionContainer = styled.div`
    flex: 1;
  padding: 2em 0;
  background-color: #ef9f99;
`;
const SuggestionTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #160951;
`;

const Suggestions = styled.div`
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  margin: 0 auto;
  display: grid;
  justify-content: space-around;
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Poster = styled.div`
  flex: 0.5;
  width: 100%;
  height: 500px;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  @media (max-width: 1050px) {
      margin-top: 5rem;
    width:50%;
    flex: none;
  }
   @media (max-width: 700px) {
    height: 300px;
  }
  @media (max-width: 500px) {
    height: 200px;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  console.log(data);
  return (
    <DetailContainer>
      <Link to="/">
        <GoHome> Back to home</GoHome>
      </Link>
      <Container>
        <Column>
          <Title>
            {loading
              ? "Loading..."
              : `${data.movie.title} ${data.movie.isLiked ? "💔" : "❤️"}`}
          </Title>
          <Description>{data?.movie?.description_intro}</Description>
          <Subtitle>
            {data?.movie?.language ? `Language : ${data?.movie?.language} -` : ""}
            {data?.movie?.rating > 0 ? ` Rating : ${data.movie.rating}` : ""}
          </Subtitle>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Container>
      <SuggestionContainer>
        <SuggestionTitle>
            {data?.suggestions &&  <h1>Other Suggestions</h1>}
        </SuggestionTitle>
        <Suggestions>
          {data?.suggestions?.map((suggestion) => (
            <Suggestion key={suggestion.id} suggestion={suggestion} />
          ))}
        </Suggestions>
      </SuggestionContainer>
    </DetailContainer>
  );
};

export default Detail;
