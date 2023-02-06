import { useEffect, useRef } from "react";

interface CanvasProps{
    urlImage: string;
    typeLogo: 'type1' | 'type2' | 'type3';
    nameLogo: string;
    nameSlogan: string;
}

const Canvas = ({ urlImage,  typeLogo, nameLogo, nameSlogan }: CanvasProps) => {
    const refCanvas = useRef< HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = refCanvas.current;
        
        if(!canvas){
            return;
        }
        
        const context = canvas.getContext('2d');

        const teste: any = new Image();

        if(!context){
            return;
        }

        const drawText = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', font: string, size: number, coordinatesX: number, coordinatesY: number) => {
            context.textAlign = 'center';
            context.font = `${fontStyle} ${size}px ${font}`;

            if(type === 'stroke'){
                context.strokeText(name, coordinatesX, coordinatesY);
            }else{
                context.fillText(name, coordinatesX, coordinatesY);
            }
        }

        if(typeLogo === 'type1'){
            teste.src = urlImage;
            teste.onload = () => {
                context.drawImage(teste, 10, -40);
            }
    
            drawText(nameLogo, 'fill', 'normal', 'Open Sans', 30, 135, 160);
            drawText(nameSlogan, 'fill', 'italic', 'Comic Sans MS', 18, 135, 200);
        }
        
        if(typeLogo === 'type2'){
            teste.src = urlImage;
            teste.onload = () => {
                context.drawImage(teste, 10, 0);
            }
    
            drawText(nameLogo,'fill', 'normal', 'Arial', 30, 135, 40);
            drawText(nameSlogan, 'fill', 'normal','Comic Sans MS', 18, 135, 222);
        }


        if(typeLogo === 'type3'){
            teste.src = urlImage;
            teste.onload = () => {
                context.drawImage(teste, 10, 30);
            }
    
            drawText(nameLogo, 'fill', 'normal' ,'Arial', 30, 135, 70);
            drawText(nameSlogan, 'fill', 'oblique' ,'Comic Sans MS', 18, 135, 100)        
        }

    }, []);

    return <canvas width={280} height={250} style={{ border: '1px solid #000000' }} ref={refCanvas} />
}

export default Canvas;