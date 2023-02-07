import { useEffect, useRef } from "react";
import { Container } from "./styles";

interface CanvasProps{
    urlImage: string;
    typeLogo: 'type1' | 'type2' | 'type3';
    nameLogo: string;
    nameSlogan: string | undefined;
    typeFontName: string;
    typeFontSlogan: string;
    styleFontName: 'normal' | 'oblique' | 'italic';
    styleFontSlogan: 'normal' | 'oblique' | 'italic';
}

const Canvas = ({ urlImage,  typeLogo, nameLogo, nameSlogan, typeFontName, typeFontSlogan, styleFontName , styleFontSlogan}: CanvasProps) => {

    console.log(typeFontName)

    const refCanvas = useRef<HTMLCanvasElement | null>(null);

    const handleDownloadImage = (event: any) => {
        const link = event.currentTarget;
        link.download = 'image.png';
        link.href = refCanvas.current?.toDataURL();
    }
    
    useEffect(() => {

        let f = new FontFace('test', "url(http://www.miketaylr.com/f/kulminoituva.ttf)");   

        f.load().then((font) => {
            console.log(font);
            const canvas = refCanvas.current;
    
            if(!canvas){
                return;
            }

            document.fonts.add(font);  

            const context = canvas.getContext('2d');
    
            const image: any = new Image();
            image.crossOrigin = 'Anonymous';
    
            if(!context){
                return;
            } 
    
            const drawText = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', font: string, size: number, coordinatesX: number, coordinatesY: number) => {
                context.textAlign = 'center';
                context.font = `${fontStyle} ${size}px test`;
    
                if(type === 'stroke'){
                    context.strokeText(name, coordinatesX, coordinatesY);
                }else{
                    context.fillText(name, coordinatesX, coordinatesY);
                }
            }
    
            const drawTextSlogan = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', font: string, size: number, coordinatesX: number, coordinatesY: number) => {
                context.textAlign = 'center';
                context.font = `${fontStyle} ${size}px ${font}`;
    
                if(type === 'stroke'){
                    context.strokeText(name, coordinatesX, coordinatesY);
                }else{
                    context.fillText(name, coordinatesX, coordinatesY);
                }
            }
    
            if(typeLogo === 'type1'){
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width/6.5, -20, 200, 200);
                    drawText(nameLogo, 'fill', styleFontName, typeFontName, 30, 140, 160);
                    if(nameSlogan){
                        drawTextSlogan(nameSlogan, 'fill', styleFontSlogan, typeFontSlogan, 18, 135, 190);
                    }
                }
            }
            
            if(typeLogo === 'type2'){
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width/8, image.width/9, 200, 200);
                    drawText(nameLogo,'fill', styleFontName, typeFontName, 30, 130, 70);
                    if(nameSlogan){
                        drawTextSlogan(nameSlogan, 'fill', styleFontSlogan, typeFontSlogan, 18, 130, 210);
                    }
                }
            }
    
    
            if(typeLogo === 'type3'){
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width/6.5, 45, 200, 200);
                    drawText(nameLogo, 'fill', styleFontName, typeFontName, 30, 135, 70);
                    if(nameSlogan){
                        drawTextSlogan(nameSlogan, 'fill', styleFontSlogan, typeFontSlogan, 18, 135, 100);
                    }
                }
            }
        })
    }, []);

    return(
        <Container>
            <canvas 
                width={280} 
                height={250} 
                style={{ border: '4px solid #000000' }} 
                ref={refCanvas}
            />

            <a className="btn-download" onClick={handleDownloadImage}> Download Image</a>
        </Container>
    )
}

export default Canvas;