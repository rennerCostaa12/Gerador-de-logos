import styled from "styled-components";

export const Container = styled.div`

    background-color: red;
    position: relative;

    .btn-download{
        display: block;
        background-color: red;
        padding: 0.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 20px;
        color: #FFFFFFFF;
        font-weight: bold;
        text-decoration: none;

        &:hover{
            background-color: black;
            transition: all ease-in 0.3s;
        }
    }
`