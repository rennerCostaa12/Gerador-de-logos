import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Components/Canvas";
import axios from "axios";
import {
  ContentLogos,
  ContentInputs,
  ContentButtonGenerateLogo,
  ContentSelectTypeFonts,
  ContentListIcons,
  ContentListIconsSelected,
  ContentSelectStyleBackground
} from './styles';

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
  color_text: string;
}

interface IconsFindedProps {
  id: number;
  url_icon: string;
}

interface ListLogosGenerateProps {
  id: number;
  icon: IconsFindedProps;
  text: ListTypeFontsProps;
  fontSlogan: string;
  model: 'design1' | 'design2' | 'design3' | 'design4' | 'design5' | 'design6';
  backgroundModel: 'circle' | 'triangle';
  colorBackgroundModel: string;
  backgroundStyle: 'backgroundStyle' | 'backgroundStyleNone' | null
}

const App = () => {
  const [listFonts, setListFonts] = useState<string[]>([]);
  const [iconsFinded, setIconsFinded] = useState<IconsFindedProps[]>([]);
  const [iconsSelected, setIconsSelected] = useState<any>([]);
  const [listLogosGenerated, setListLogosGenerated] = useState<ListLogosGenerateProps[]>([]);
  const [isBackgroundStyle, setIsBackgroundStyle] = useState<'backgroundStyle' | 'backgroundStyleNone' | null>(null);
  
  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');

  const [stepRendered, setStepRendered] = useState<React.ReactNode | null>(null);
  const [step, setStep] = useState<number>(1);
  
  const refNameLogo = useRef<HTMLInputElement | null>(null);
  const refNameSlogan = useRef<HTMLInputElement | null>(null);

  const limitChoosedIcons = 5;

  const handleChooseIcon = (dataIcon: IconsFindedProps) => {    
    if (iconsSelected.length < 5) {
      setIconsSelected((currentItem: IconsFindedProps[]) => [...currentItem, dataIcon]);
    } else {
      alert(`O limite é de ${iconsSelected.length} ícones`);
    }
  }

  const handleRemoveIconChoosed = (dataIcon: IconsFindedProps) => {
    const removeIconSelected = iconsSelected.filter((data: IconsFindedProps) => data.id !== dataIcon.id);
    setIconsSelected(removeIconSelected);
  
  }

  const handleSelectsTypFonts = (font: string) => {
    if (!listFonts.includes(font)) {
      setListFonts(currentData => [...currentData, font]);
    }

    if(listFonts.includes(font)){
      const removeListFonts = listFonts.filter((data) => data !== font);
      setListFonts(removeListFonts);
    }
  }

  const handleIcons = async () => {
    try {
      const responseIcons = await axios({
        method: 'get',
        url: 'http://localhost:3000/listFlatIcons'
      })
      setIconsFinded(responseIcons.data);
    } catch (error) {
      console.log(error);
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

  const handleNextStepSelectIcons = () => {
    if (iconsSelected.length < 5) {
      alert('Selecione os cincos itens');
      return;
    }

    setStep(currentStep => currentStep + 1);
  }

  const handleNextStepTypeLogo = () => {
    if(isBackgroundStyle === null){
      alert('Escolha um tipo de logo');
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
      const responseListTypeFonts = await axios.get('http://localhost:3000/fontStyles');
      const responseListDesign = await axios.get('http://localhost:3000/listTypeDesign');
      const responseListFontSlogan = await axios.get('http://localhost:3000/fontStyleSlogan');
      const responseListTypeText = await axios.get('http://localhost:3000/typesText');
      const responseListColors = await axios.get('http://localhost:3000/listColors');
      const responseListBackgroundStyleLogo = await axios.get('http://localhost:3000/backgroundStyleLogo');
      const responseListBackgroundStyleColor = await axios.get('http://localhost:3000/backgroundStyleColor');

      for (let indice = 1; indice < 51; indice++) {

        const logoChoosed = handleChooseElement(iconsSelected);
        const colorTextChoosed = handleChooseElement(responseListColors.data);
        const fontChoosed = handleChooseElement(responseListTypeFonts.data) as any;
        const designChoosed = handleChooseElement(responseListDesign.data);
        const fontSloganChoosed = handleChooseElement(responseListFontSlogan.data);
        const typeText = handleChooseElement(responseListTypeText.data);
        const backgroundLogoStyle = handleChooseElement(responseListBackgroundStyleLogo.data);
        const backgroundLogoColor = handleChooseElement(responseListBackgroundStyleColor.data);

        fontChoosed['type_text'] = typeText;
        fontChoosed['color_text'] = colorTextChoosed;

        const modelJsonGenerate = {
          id: indice,
          icon: logoChoosed,
          text: fontChoosed,
          fontSlogan: fontSloganChoosed,
          model: designChoosed,
          backgroundModel: backgroundLogoStyle,
          colorBackgroundModel: backgroundLogoColor,
          backgroundStyle: isBackgroundStyle
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
          <ContentListIcons>
            {iconsFinded.slice(0, 26).map((value, index) => {
              return (
                <button 
                  disabled={iconsSelected.includes(value)} 
                  style={{ border: iconsSelected.includes(value) ? '1px solid red' : '' }}
                  onClick={() => handleChooseIcon(value)} key={index}
                >
                  <img src={value.url_icon} alt={`icon-${value.id}`} />
                </button>
              )
            })}
          </ContentListIcons>

          {iconsSelected.length > 0 &&
            <>
              <ContentListIconsSelected>
                {iconsSelected.map((value: IconsFindedProps, index: number) => {
                  return (
                    <button title="remover ícone" key={index} onClick={() => handleRemoveIconChoosed(value)}>
                      {value && <img src={value.url_icon} alt={`icon-${value.id}`} />}
                    </button>
                  )
                })}
              </ContentListIconsSelected>
              <span style={{ display: 'block', fontSize: '30px', textAlign: 'center' }}>{iconsSelected.length}/{limitChoosedIcons}</span>
              {iconsSelected.length === 5 &&
                <ContentButtonGenerateLogo>
                  <button onClick={() => setStep(currentStep => currentStep - 1)}>Voltar</button>
                  <button onClick={handleNextStepSelectIcons}>Próximo</button>
                </ContentButtonGenerateLogo>
              }
            </>
          }
        </>
      )
    } else if(step === 3){
      setStepRendered(
        <>
          <ContentSelectStyleBackground>
            <h1>Estilos de Logo</h1>

            <div>
              <div className="content-cards">
                <div 
                  style={{ border: isBackgroundStyle === 'backgroundStyle' ? "2px solid blue" : "" }}
                  onClick={() => setIsBackgroundStyle('backgroundStyle')}
                >
                  <div>
                    <img src="img/backgroundstyle-circle.png" alt="background-style-circle" />
                  </div>
                  <div>
                    <img src="img/backgroundstyle-triangle.png" alt="background-style-triangle" />
                  </div>
                </div>
                
                <div 
                  style={{ border: isBackgroundStyle === 'backgroundStyleNone' ? "2px solid blue" : "" }}
                  onClick={() => setIsBackgroundStyle('backgroundStyleNone')}
                >
                  <div>
                    <img src="img/backgroundstyle-normal-1.png" alt="background-style-normal-1" />
                  </div>
                  <div>
                    <img src="img/backgroundstyle-normal-2.png" alt="background-style-normal-2" />
                  </div>
                </div>
              </div>
              <ContentButtonGenerateLogo>
                <button onClick={() => setStep(currentStep => currentStep - 1)}>Voltar</button>
                <button onClick={handleNextStepTypeLogo}>Próximo</button>
              </ContentButtonGenerateLogo>
            </div>
          </ContentSelectStyleBackground>
        </>
      )
    } else if (step === 4) {
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
              <button onClick={() => setStep(currentStep => currentStep - 1)}>Voltar</button>
              <button onClick={handleGenerateLogo}>Gerar</button>
            </ContentButtonGenerateLogo>
          }
        </>
      )
    }
  }, [step, listFonts, isBackgroundStyle, iconsSelected, nameLogo, nameSlogan]);

  useEffect(() => {
    handleIcons();
  }, []);

  const listFilteredTypeFont = listLogosGenerated?.filter((data) => listFonts.includes(data.text.name_font));

  return(
    <div className="App">
      <div className="content-logos">

        {stepRendered}

        {listFilteredTypeFont.length !== 0 &&
          <ContentLogos>
            {listFilteredTypeFont?.map((value, index) => {
              return (
                <React.Fragment key={index}>
                  <Canvas
                    backgroundStyle={value.backgroundStyle}
                    backgroundModel={value.backgroundModel}
                    colorBackgroundModel={value.colorBackgroundModel}
                    typeFont={value.text && value.text.type_text}
                    colorLogoText={value.text.color_text}
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

export default App;
