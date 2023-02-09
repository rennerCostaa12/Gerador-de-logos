import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Components/Canvas";
import axios from "axios";
import { ContentLogos, ContentInputs, ContentSelectTypeImages, ContentButtonGenerateLogo, ContentSelectTypeFonts } from './styles';

interface DatasLogoProps {
  id: number;
  icon: {
    colors_icon: any;
    model: '2d' | '3d';
    url_icon: string;
  };
  model: 'type1' | 'type2' | 'type3';
  text: {
    type_font_slogan: string;
    link_font_name: string;
    name_link_font: string;
    slogan_type_font: string;
  };
}

interface ListIconsProps {
  colors_icon: string[];
  id: number;
  type_icon: '2d' | '3d',
  url_icon: string;
}

interface ListTypeFontsProps {
  id: number;
  link: string;
  name_font: string;
}

interface ListLogosGenerateProps {
  id: number;
  icon: ListIconsProps;
  text: ListTypeFontsProps;
  fontSlogan: string;
  model: 'type1' | 'type2' | 'type3',
}

function App() {

  const [listFonts, setListFonts] = useState<string[]>([]);
  
  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');
  const [typeLogo, setTypeLogo] = useState<'2d' | '3d' | undefined>(undefined);

  const [listLogosGenerated, setListLogosGenerated] = useState<ListLogosGenerateProps[]>([]);
  
  const refNameLogo = useRef<HTMLInputElement | null>(null);
  const refNameSlogan = useRef<HTMLInputElement | null>(null);

  const handleShowLogo = () => {
    const valueNameLogo = refNameLogo.current?.value;
    const valueNameSlogan = refNameSlogan.current?.value;

    if(valueNameLogo && valueNameSlogan){
        setNameLogo(valueNameLogo);
        setNameSlogan(valueNameSlogan);
    }
  }

  const handleRandomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleChooseElement = (list: ListIconsProps[]) => {
    const randomIndex = handleRandomIndex(0, list.length - 1);
    return list[randomIndex];
  }
 
  const handleGenerateLogo = async () => {
    
    let listTeste = [];
    
    try{
      const responseListIcons = await axios.get('http://localhost:3000/listIcons');
      const responseListTypeFonts = await axios.get('http://localhost:3000/fontStyles');
      const responseListDesign = await axios.get('http://localhost:3000/listTypeDesign');
      const responseListFontSlogan = await axios.get('http://localhost:3000/fontStyleSlogan');

      for (let indice = 1; indice < 11; indice++) {
        const logoChoosed = handleChooseElement(responseListIcons.data);
        const fontChoosed = handleChooseElement(responseListTypeFonts.data);
        const designChoosed = handleChooseElement(responseListDesign.data);
        const fontSloganChoosed = handleChooseElement(responseListFontSlogan.data);

        const modelJsonGenerate = {
          id: indice,
          icon: logoChoosed,
          text: fontChoosed,
          fontSlogan: fontSloganChoosed,
          model: designChoosed,
        }
        
        listTeste.push(modelJsonGenerate);
      }
      setListLogosGenerated(listTeste as any);
      handleShowLogo();
    }catch(error){
      console.log(error);
    }
  } 

  const listFilteredTypeImage = listLogosGenerated?.filter((data) => data.icon.type_icon === typeLogo);
  const listFilteredTypeFont = listFilteredTypeImage?.filter((data) => listFonts.includes(data.text.name_font));

  return (
    <div className="App">
      <div className="content-logos">
        <ContentInputs>
          <input type="text" ref={refNameLogo} placeholder="Nome da logo" />
          <input type="text" ref={refNameSlogan} placeholder="Slogan" />
        </ContentInputs>

        <ContentSelectTypeImages>
          <div className="content-images" style={{ border: typeLogo === '2d' ? '2px solid red' : '' }} onClick={() => setTypeLogo('2d')}>
            <img src="https://cdn-icons-png.flaticon.com/512/5031/5031271.png" alt="2d" />
            <span>Ícone 2D</span>
          </div>
          <div className="content-images" style={{ border: typeLogo === '3d' ? '2px solid red' : '' }} onClick={() => setTypeLogo('3d')}>
            <img src="https://icon-library.com/images/3d-car-icon/3d-car-icon-6.jpg" alt="3d" />
            <span>Ícone 3D</span>
          </div>
        </ContentSelectTypeImages>

        <ContentSelectTypeFonts>
          <button
            style={{ border: listFonts.includes('Montserrat') ? '1px solid blue' : '', fontFamily: 'Montserrat' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Montserrat')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Montserrat') ? '' : setListFonts(current => [...current, 'Montserrat'])}
          >
            <h1>Montserrat</h1>
          </button>
          <button
            style={{ border: listFonts.includes('Neucha') ? '1px solid blue' : '', fontFamily: 'Neucha' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Neucha')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Neucha') ? '' : setListFonts(current => [...current, 'Neucha'])}
          >
            <h1>Neucha</h1>
          </button>
          <button
            style={{ border: listFonts.includes('Niconne') ? '1px solid blue' : '', fontFamily: 'Niconne' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Niconne')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Niconne') ? '' : setListFonts(current => [...current, 'Niconne'])}
          >
            <h1>Niconne</h1>
          </button>
          <button
            style={{ border: listFonts.includes('Lobster') ? '1px solid blue' : '', fontFamily: 'Lobster' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Lobster')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Lobster') ? '' : setListFonts(current => [...current, 'Lobster'])}
          >
            <h1>Lobster</h1>
          </button>
          <button
            style={{ border: listFonts.includes('Oswald') ? '1px solid blue' : '', fontFamily: 'Oswald' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Oswald')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Oswald') ? '' : setListFonts(current => [...current, 'Oswald'])}
          >
            <h1>Oswald</h1>
          </button>
          <button
            style={{ border: listFonts.includes('Itim') ? '1px solid blue' : '', fontFamily: 'Itim' }}
            disabled={listFonts.length >= 3 && !listFonts.includes('Itim')}
            onClick={() => listFonts.length >= 3 || listFonts.includes('Itim') ? '' : setListFonts(current => [...current, 'Itim'])}
          >
            <h1>Itim</h1>
          </button>
        </ContentSelectTypeFonts>

        {typeLogo !== undefined && listFonts.length >= 3 &&
          <ContentButtonGenerateLogo>
            <button onClick={handleGenerateLogo}>Gerar</button>
          </ContentButtonGenerateLogo>
        }

        <button onClick={handleGenerateLogo}>TESTE</button>

        {nameLogo && nameSlogan &&
          <ContentLogos>
            {listFilteredTypeFont?.map((value, index) => {
              return(
                <React.Fragment key={index}>
                  <Canvas 
                    colorIcon={value.icon.colors_icon}
                    typeFontSlogan={value.fontSlogan}
                    nameLogo={nameLogo} 
                    nameSlogan={nameSlogan} 
                    typeLogo={value.model} 
                    linkFontName={value.text.link}
                    nameFontLink={value.text.name_font}
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
