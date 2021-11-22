import React from 'react'
import styled from 'styled-components'


const Title = styled.h1`
    opacity:0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    text-align: center;
`

const Container = styled.div`
    position:relative;
    height: 150px;
    width: 100%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    transition: all 0.25s ease;
    cursor: pointer;
   
    &:hover {
       background: rgba(0,0,0,0.7);
        ${Title}{
            opacity:1;
            color:white;
        }
    }
    @media (max-width: 700px) {
    height: 120px;
    width: 70%;
    margin: 0 auto;
  }
`

const Suggestion = ({suggestion}) => {
    console.log(suggestion);
    return (
        <Container bg={suggestion?.medium_cover_image}>
            <Title>{suggestion.title}</Title>
        </Container>
    )
}

export default Suggestion
