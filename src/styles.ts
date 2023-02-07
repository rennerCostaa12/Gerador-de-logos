import styled from 'styled-components';

export const ContentInputs = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 1rem 0;

    input {
        padding: 0.5rem;
    }

    button{
        padding: 0.5rem 1.5rem;
        font-size: 20px;
        cursor: pointer;
    }
`

export const ContentSelectTypeImages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .content-images{
        cursor: pointer;
        border: 2px solid #000000;
        border-radius: 7px;
        padding: 1rem;
    }

    .content-images img{
        width: 150px;
    }
`

export const ContentButtonGenerateLogo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem;

    button{
        font-size: 20px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: red;
        color: blue;
        border: 1px solid #000000;
        font-weight: bold;
    }
`

export const ContentLogos = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    padding: 10px;
    flex-wrap: wrap;
`