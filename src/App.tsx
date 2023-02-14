import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Components/Canvas";
import axios from "axios";
import {
  ContentLogos,
  ContentInputs,
  ContentSelectTypeImages,
  ContentButtonGenerateLogo,
  ContentSelectTypeFonts,
  ContentListIcons,
  ContentListIconsSelected
} from './styles';

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

interface IconsFindedProps {
  id: number;
  url_icon: string;
}

interface ListLogosGenerateProps {
  id: number;
  icon: IconsFindedProps;
  text: ListTypeFontsProps;
  fontSlogan: string;
  model: 'type1' | 'type2' | 'type3' | 'type4',
}

function App() {

  const [listFonts, setListFonts] = useState<string[]>([]);

  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');

  const [stepRendered, setStepRendered] = useState<React.ReactNode | null>(null);
  const [step, setStep] = useState<number>(1);

  const [iconsFinded, setIconsFinded] = useState<IconsFindedProps[]>([]);
  const [iconsSelected, setIconsSelected] = useState<any>([]);

  const [listLogosGenerated, setListLogosGenerated] = useState<ListLogosGenerateProps[]>([]);

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

      for (let indice = 1; indice < 51; indice++) {
        const logoChoosed = handleChooseElement(iconsSelected);
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
          <ContentListIcons>
            {iconsFinded.slice(0, 26).map((value, index) => {
              return (
                <div onClick={() => handleChooseIcon(value)} key={index}>
                  <img src={value.url_icon} alt={`icon-${value.id}`} />
                </div>
              )
            })}
          </ContentListIcons>

          {iconsSelected.length > 0 &&
            <>
              <ContentListIconsSelected>
                {iconsSelected.map((value: IconsFindedProps, index: number) => {
                  return (
                    <div key={index} onClick={() => handleRemoveIconChoosed(value)}>
                      {value && <img src={value.url_icon} alt={`icon-${value.id}`} />}
                    </div>
                  )
                })}
              </ContentListIconsSelected>
              <span style={{ display: 'block', fontSize: '30px', textAlign: 'center' }}>{iconsSelected.length}/{limitChoosedIcons}</span>
              {iconsSelected.length === 5 &&
                <ContentButtonGenerateLogo>
                  <button onClick={handleNextStepSelectIcons}>Próximo</button>
                </ContentButtonGenerateLogo>
              }
            </>
          }
        </>
      )
    } else if (step === 3) {
      setStepRendered(
        <>
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
          {listFonts.length >= 3 &&
            <ContentButtonGenerateLogo>
              <button onClick={handleGenerateLogo}>Gerar</button>
            </ContentButtonGenerateLogo>
          }
        </>
      )
    }
  }, [step, listFonts, iconsSelected, nameLogo, nameSlogan]);

  useEffect(() => {
    handleIcons();
  }, []);


  const listFilteredTypeFont = listLogosGenerated?.filter((data) => listFonts.includes(data.text.name_font));

  console.log(listFilteredTypeFont);

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
                    colorIcon={['#000000']}
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
