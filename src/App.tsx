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
  model: 'type1' | 'type2' | 'type3' | 'type4';
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
  type_text: 'fill' | 'stroke';
}

interface ListLogosGenerateProps {
  id: number;
  icon: ListIconsProps;
  text: ListTypeFontsProps;
  fontSlogan: string;
  model: 'type1' | 'type2' | 'type3' | 'type4',
}

function App() {

  const [listFonts, setListFonts] = useState<string[]>([]);

  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');
  const [typeLogo, setTypeLogo] = useState<'2d' | '3d' | undefined>(undefined);

  const [stepRendered, setStepRendered] = useState<React.ReactNode | null>(null);
  const [step, setStep] = useState<number>(1);

  const [listLogosGenerated, setListLogosGenerated] = useState<ListLogosGenerateProps[]>([]);

  const refNameLogo = useRef<HTMLInputElement | null>(null);
  const refNameSlogan = useRef<HTMLInputElement | null>(null);

  const handleSelectsTypFonts = (font: string) => {
    if (!listFonts.includes(font)) {
      setListFonts(currentData => [...currentData, font]);
    }

    if(listFonts.includes(font)){
      const removeListFonts = listFonts.filter((data) => data !== font);
      setListFonts(removeListFonts);
    }
  }

  const handleNextStepNameLogo = () => {
    if (!nameLogo) {
      alert('Digite o nome de sua logo!');
      return;
    }

    if (!nameSlogan) {
      alert('Digite o nome de seu slogan!');
      return;
    }
    setStep(currentStep => currentStep + 1);
  }

  const handleNextStepSelectTypeIcon = () => {
    if (!typeLogo) {
      alert('Escolha o tipo de ícone');
      return;
    }
    setStep(currentStep => currentStep + 1);
  }

  const handleShowLogo = () => {
    const valueNameLogo = refNameLogo.current?.value;
    const valueNameSlogan = refNameSlogan.current?.value;

    if (valueNameLogo && valueNameSlogan) {
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

    try {
      const responseListIcons = await axios.get('http://localhost:3000/listIcons');
      const responseListTypeFonts = await axios.get('http://localhost:3000/fontStyles');
      const responseListDesign = await axios.get('http://localhost:3000/listTypeDesign');
      const responseListFontSlogan = await axios.get('http://localhost:3000/fontStyleSlogan');
      const responseListTypeText = await axios.get('http://localhost:3000/typesText');

      for (let indice = 1; indice < 51; indice++) {
        const logoChoosed = handleChooseElement(responseListIcons.data);
        const fontChoosed = handleChooseElement(responseListTypeFonts.data) as any;
        const designChoosed = handleChooseElement(responseListDesign.data);
        const fontSloganChoosed = handleChooseElement(responseListFontSlogan.data);
        const typeText = handleChooseElement(responseListTypeText.data);

        fontChoosed['type_text'] = typeText;

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (step === 1) {
      setStepRendered(
        <>
          <ContentInputs>
            <input
              type="text"
              placeholder="Nome da logo"
              onChange={(event) => setNameLogo(event.target.value)}
            />
            <input
              type="text"
              placeholder="Slogan"
              onChange={(event) => setNameSlogan(event.target.value)}
            />
          </ContentInputs>
          <ContentButtonGenerateLogo>
            <button onClick={handleNextStepNameLogo}>Próximo</button>
          </ContentButtonGenerateLogo>
        </>
      )
    } else if (step === 2) {
      setStepRendered(
        <>
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
          <ContentButtonGenerateLogo>
            <button onClick={handleNextStepSelectTypeIcon}>Próximo</button>
          </ContentButtonGenerateLogo>
        </>
      )
    } else if (step === 3) {
      setStepRendered(
        <>
          <ContentSelectTypeFonts>
            <button
              style={{ border: listFonts.includes('Montserrat') ? '1px solid blue' : '', fontFamily: 'Montserrat' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Montserrat')}
              onClick={() => handleSelectsTypFonts('Montserrat')}
            >
              <h1>Montserrat</h1>
            </button>
            <button
              style={{ border: listFonts.includes('Neucha') ? '1px solid blue' : '', fontFamily: 'Neucha' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Neucha')}
              onClick={() => handleSelectsTypFonts('Neucha')}
            >
              <h1>Neucha</h1>
            </button>
            <button
              style={{ border: listFonts.includes('Niconne') ? '1px solid blue' : '', fontFamily: 'Niconne' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Niconne')}
              onClick={() => handleSelectsTypFonts('Niconne')}
            >
              <h1>Niconne</h1>
            </button>
            <button
              style={{ border: listFonts.includes('Lobster') ? '1px solid blue' : '', fontFamily: 'Lobster' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Lobster')}
              onClick={() => handleSelectsTypFonts('Lobster')}
            >
              <h1>Lobster</h1>
            </button>
            <button
              style={{ border: listFonts.includes('Oswald') ? '1px solid blue' : '', fontFamily: 'Oswald' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Oswald')}
              onClick={() => handleSelectsTypFonts('Oswald')}
            >
              <h1>Oswald</h1>
            </button>
            <button
              style={{ border: listFonts.includes('Itim') ? '1px solid blue' : '', fontFamily: 'Itim' }}
              disabled={listFonts.length >= 3 && !listFonts.includes('Itim')}
              onClick={() => handleSelectsTypFonts('Itim')}
            >
              <h1>Itim</h1>
            </button>
          </ContentSelectTypeFonts>
          {listFonts.length >= 3 &&
            <ContentButtonGenerateLogo>
              <button onClick={handleGenerateLogo}>Gerar</button>
            </ContentButtonGenerateLogo>
          }
        </>
      )
    }
  }, [step, listFonts, typeLogo, nameLogo, nameSlogan]);

  const listFilteredTypeImage = listLogosGenerated?.filter((data) => data.icon.type_icon === typeLogo);
  const listFilteredTypeFont = listFilteredTypeImage?.filter((data) => listFonts.includes(data.text.name_font));

  console.log(listFonts);

  return (
    <div className="App">
      <div className="content-logos">

        {stepRendered}

        {listFilteredTypeFont.length !== 0 &&
          <ContentLogos>
            {listFilteredTypeFont?.map((value, index) => {
              return (
                <React.Fragment key={index}>
                  <Canvas
                    typeFont={value.text && value.text.type_text}
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
