import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Components/Canvas";
import axios from "axios";
import { ContentLogos, ContentInputs } from './styles';

interface DatasLogoProps {
  icon: {
    url_icon: string;
  };
  model: 'model1' | 'model2' | 'model3';
  text: {
    name: string;
    slogan: string;
    font_size_name: string;
    font_size_slogan: string;
    font_weight_name: string;
    font_weight_slogan: string;
  };
}

function App() {

  const [dataLogo, setDatasLogo] = useState<DatasLogoProps[] | null>(null);
  
  const [nameLogo, setNameLogo] = useState<string>('');
  const [nameSlogan, setNameSlogan] = useState<string>('');

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
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  console.log(nameLogo)

  return (
    <div className="App">
      <div className="content-logos">

        <ContentInputs>
          <input type="text" ref={refNameLogo} placeholder="Nome da logo" />
          <input type="text" ref={refNameSlogan} placeholder="Slogan" />
          <button onClick={handleGenerateLogo}>Gerar</button>
        </ContentInputs>

        {nameLogo && nameSlogan &&
          <ContentLogos>
                <Canvas 
                  nameLogo={nameLogo} 
                  nameSlogan={nameSlogan} 
                  typeLogo="type1" 
                  urlImage="https://cdn.iconscout.com/icon/premium/png-256-thumb/car-accident-5000542-4158606.png" 
                />
                <Canvas 
                  nameLogo={nameLogo} 
                  nameSlogan={nameSlogan} 
                  typeLogo="type2" 
                  urlImage="https://images.vexels.com/media/users/3/256796/isolated/lists/e9f249577a6c890ad2ecd04d6707b4f1-car-icon-stroke.png" 
                />
                <Canvas 
                  nameLogo={nameLogo} 
                  nameSlogan={nameSlogan} 
                  typeLogo="type3" 
                  urlImage="https://gigantesprotecao.com.br/wp-content/uploads/2022/10/sportive-car.png" 
                />
          </ContentLogos>
        }
      </div>
    </div>
  )
}

export default App
