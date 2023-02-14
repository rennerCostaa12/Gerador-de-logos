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

    .content-images span{
        display: block;
        font-size: 25px;
        font-family: 'Lobster';
        text-align: center;
    }
`

export const ContentSelectTypeFonts = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin: 1rem 0;

    > button {
        cursor: pointer;
        background: none;
        font-size: 20px;
        text-align: center;
        width: 250px;
        border-radius: 5px;
        padding: 1.5rem 0;
        border: 1px solid #000000;
        -webkit-box-shadow: 0px 2px 6px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 2px 6px 1px rgba(0,0,0,0.75);
        box-shadow: 0px 2px 6px 1px rgba(0,0,0,0.75);

        &:hover {
            transition: all ease 0.3s;
            border: 1px solid red;
        }
    }
`

export const ContentButtonGenerateLogo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 1rem 0;

    button:nth-child(1){
        border: 1px solid red;
        background: none;
        color: red;
    }

    button{
        font-size: 20px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: red;
        color: white;
        border: 1px solid red;
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

export const ContentListIcons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    > button {
        img{
            width: 100px;
        }
        background: none;
        border: 1px solid #000000;
        padding: 0.5rem;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            transition: all ease 0.3s;
            border: 1px solid red;
        }
    }
`

export const ContentListIconsSelected = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 2rem 0;
    
    > button{
        img{
            width: 150px;
        }
        background: none;
        border: 1px dashed #000;
        cursor: pointer;
        padding: 1rem;
        border-radius: 8px;
        
        &:hover{
            transition: ease-in-out 0.3s;
            border: 1px dashed blue;
        }
    }
`