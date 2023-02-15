import { useEffect, useRef } from "react";
import { Container } from "./styles";

interface CanvasProps {
    urlImage: string;
    typeFont: 'fill' | 'stroke';
    typeLogo: 'type1' | 'type2' | 'type3' | 'type4';
    nameLogo: string;
    nameSlogan: string | undefined;
    typeFontSlogan: string;
    linkFontName: string;
    nameFontLink: string;
    colorSlogan: string;
    backgroundModel: 'circle' | 'triangle';
    colorBackgroundModel: string;
    backgroundStyle: 'backgroundStyle' | 'backgroundStyleNone' | null
}

const Canvas = ({ 
    urlImage, 
    typeLogo, 
    nameLogo, 
    nameSlogan, 
    typeFontSlogan, 
    linkFontName, 
    nameFontLink, 
    colorSlogan, 
    typeFont, 
    backgroundModel, 
    colorBackgroundModel,
    backgroundStyle
}: CanvasProps) => {

    const refCanvas = useRef<HTMLCanvasElement | null>(null);

    const handleDownloadImage = (event: any) => {
        const link = event.currentTarget;
        link.download = 'image.png';
        link.href = refCanvas.current?.toDataURL();
    }

    useEffect(() => {
        const font = new FontFace(nameFontLink, `url(${linkFontName})`, {
            style: 'normal',
            weight: '400',
        });

        font.load().then((font) => {

            document.fonts.add(font);
            const canvas = refCanvas.current;

            if (!canvas) {
                return;
            }

            const context = canvas.getContext('2d');

            const image: any = new Image();
            image.crossOrigin = 'Anonymous';

            if (!context) {
                return;
            }

            context.rect(0, 0, 280, 250);
            context.fillStyle = '#FFFFFF';
            context.fill();

            
            if(typeLogo === 'type1' && backgroundModel === 'circle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();    
                context.arc(138, 79, 70, 0, 2 * Math.PI);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type2' && backgroundModel === 'circle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.arc(138, 110, 80, 0, 2 * Math.PI);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type3' && backgroundModel === 'circle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.arc(138, 130, 70, 0, 2 * Math.PI);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type4' && backgroundModel === 'circle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.arc(200, 115, 70, 0, 2 * Math.PI);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type1' && backgroundModel === 'triangle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.moveTo(140,20);
                context.lineTo(20,155);
                context.lineTo(260,155);
                context.lineTo(140,20);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type2' && backgroundModel === 'triangle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.moveTo(140,20);
                context.lineTo(20,155);
                context.lineTo(260,155);
                context.lineTo(140,20);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type3' && backgroundModel === 'triangle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.moveTo(140,20);
                context.lineTo(20,165);
                context.lineTo(260,165);
                context.lineTo(140,20);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            if(typeLogo === 'type4' && backgroundModel === 'triangle' && backgroundStyle === 'backgroundStyle'){
                context.beginPath();
                context.moveTo(180,20);
                context.moveTo(200,20);
                context.lineTo(120,160);
                context.lineTo(275,160);
                context.lineTo(200,20);
                context.fillStyle = colorBackgroundModel;
                context.fill();
            }

            const drawText = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', size: number, coordinatesX: number, coordinatesY: number) => {
                context.textAlign = 'center';
                context.font = `${fontStyle} ${size}px ${nameFontLink}`;
                
                if (type === 'stroke') {
                    context.strokeStyle = colorSlogan;
                    context.strokeText(name, coordinatesX, coordinatesY);
                } else {
                    context.fillStyle = colorSlogan;
                    context.fillText(name, coordinatesX, coordinatesY);
                }
            }

            const drawTextSlogan = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', font: string, size: number, coordinatesX: number, coordinatesY: number) => {
                context.textAlign = 'center';
                context.fillStyle = '#000000';
                context.font = `${fontStyle} ${size}px ${font}`;

                if (type === 'stroke') {
                    context.strokeText(name, coordinatesX, coordinatesY);
                } else {
                    context.fillText(name, coordinatesX, coordinatesY);
                }
            }

            if (typeLogo === 'type1') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 50, 60, 60);;
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 7 ? 30 : 40, 140, 140);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 170);
                    }
                }
            }

            if (typeLogo === 'type2') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 80, 60, 60);
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 7 ? 30 : 40, 140, 70);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 170);
                    }
                }
            }


            if (typeLogo === 'type3') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 100, 60, 60);
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 7 ? 30 : 40, 140, 70);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 90);
                    }
                }
            }

            if (typeLogo === 'type4') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 1.5, 85, 60, 60);;
                    drawText(nameLogo, typeFont, 'normal',  nameLogo.length >= 7 ? 25 : 40, 90, 120);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 15 ? 11 : 16, 90, 140);
                    }
                }
            }
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
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