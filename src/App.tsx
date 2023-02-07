import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Components/Canvas";
import axios from "axios";
import { ContentLogos, ContentInputs, ContentSelectTypeImages, ContentButtonGenerateLogo } from './styles';

import { GlobalStyle } from "./GlobalStyles";

interface DatasLogoProps {
  id: number;
  icon: {
    colors_icon: any;
    model: '2d' | '3d';
    url_icon: string;
  };
  model: 'type1' | 'type2' | 'type3';
  text: {
    type_font_name: string;
    type_font_slogan: string;
    type_font_style_name: 'normal' | 'oblique' | 'italic';
    type_font_style_slogan: 'normal' | 'oblique' | 'italic';
  };
}

function App() {

  const [datasLogo, setDatasLogo] = useState<DatasLogoProps[] | null>(null);
  
  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');
  const [typeLogo, setTypeLogo] = useState<'2d' | '3d' | undefined>(undefined);

  const refNameLogo = useRef<HTMLInputElement | null>(null);
  const refNameSlogan = useRef<HTMLInputElement | null>(null);

  const handleGenerateLogo = () => {
    const valueNameLogo = refNameLogo.current?.value;
    const valueNameSlogan = refNameSlogan.current?.value;

    if(valueNameLogo && valueNameSlogan){
        setNameLogo(valueNameLogo);
        setNameSlogan(valueNameSlogan);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3000/logosAvaliable')
    .then((response) => {
      setDatasLogo(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <div className="content-logos">
        <ContentInputs>
          <input type="text" ref={refNameLogo} placeholder="Nome da logo" />
          <input type="text" ref={refNameSlogan} placeholder="Slogan" />
        </ContentInputs>

        <ContentSelectTypeImages>
          <div className="content-images" style={{ border: typeLogo === '2d' ? '2px solid red' : '' }} onClick={() => setTypeLogo('2d')}>
            <img src="https://cdn-icons-png.flaticon.com/512/5031/5031271.png" alt="2d" />
          </div>
          <div className="content-images" style={{ border: typeLogo === '3d' ? '2px solid red' : '' }} onClick={() => setTypeLogo('3d')}>
            <img src="https://icon-library.com/images/3d-car-icon/3d-car-icon-6.jpg" alt="3d" />
          </div>
        </ContentSelectTypeImages>

        {typeLogo !== undefined &&
          <ContentButtonGenerateLogo>
            <button onClick={handleGenerateLogo}>Gerar</button>
          </ContentButtonGenerateLogo>
        }

        {nameLogo && nameSlogan &&
          <ContentLogos>
            {datasLogo?.filter((data) => data.icon.model === typeLogo ).map((value, index) => {
              console.log(value);
              return(
                <React.Fragment key={index}>
                  <Canvas 
                    styleFontName={value.text.type_font_style_name}
                    styleFontSlogan={value.text.type_font_style_slogan}
                    typeFontName={value.text.type_font_name}
                    typeFontSlogan={value.text.type_font_slogan}
                    nameLogo={nameLogo} 
                    nameSlogan={nameSlogan} 
                    typeLogo={value.model} 
                    urlImage={value.icon.url_icon}
                  />
                </React.Fragment>
              )
            })}
          </ContentLogos>
        }
      </div>
    </div>
  )
}
export default App
