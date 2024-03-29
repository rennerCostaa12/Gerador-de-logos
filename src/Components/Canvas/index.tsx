import FileSaver from "file-saver";

import { useEffect, useRef } from "react";
import { Container } from "./styles";
import Menu from "../Menu";
import { ModelsDesignProps, TypeFontSloganProps } from "../../App";

interface CanvasProps {
    urlImage: string;
    typeFont: 'fill' | 'stroke';
    typeLogo: ModelsDesignProps;
    nameLogo: string;
    nameSlogan: string | undefined;
    typeFontSlogan: TypeFontSloganProps;
    linkFontName: string;
    nameFontLink: string;
    colorLogoText: string;
    colorDesignLogo: string;
}

const Canvas = ({ 
    urlImage, 
    typeLogo, 
    nameLogo, 
    nameSlogan, 
    typeFontSlogan, 
    linkFontName, 
    nameFontLink, 
    colorLogoText, 
    typeFont,
    colorDesignLogo
}: CanvasProps) => {

    const refCanvas = useRef<HTMLCanvasElement | null>(null);

    const handleDownloadImage = (event: any) => {
        const link = event.currentTarget;
        link.download = 'image.png';
        link.href = refCanvas.current?.toDataURL();

        const contentBriefing = `Fonte da logo: ${nameFontLink}, Fonte do slogan: ${typeFontSlogan}, Url da logo: ${urlImage}, Cor da logo: ${colorLogoText}, Cor do slogan: #000000, Cor do fundo: #FFFFFFFF`;
        const fileName = "briefingLogo.txt";
        const blob = new Blob([contentBriefing], {
            type: "text/plain;charset=utf-8"
        });

        FileSaver.saveAs(blob, fileName);
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

            const drawText = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', size: number, coordinatesX: number, coordinatesY: number, colorText: string, nameFont: string) => {
                context.textAlign = 'center';
                context.font = `${fontStyle} ${size}px ${nameFont}`;
                
                if (type === 'stroke') {
                    context.strokeStyle = colorText;
                    context.strokeText(name, coordinatesX, coordinatesY);
                } else {
                    context.fillStyle = colorText;
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

            if (typeLogo === 'design1') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 50, 60, 60);;
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 12 ? 30 : 35, 140, 165, colorLogoText, nameFontLink);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 16, 140, 200);
                    }
                }
            }

            if (typeLogo === 'design2') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 80, 60, 60);
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 12 ? 30 : 35, 140, 70, colorLogoText, nameFontLink);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 16, 140, 170);
                    }
                }
            }


            if (typeLogo === 'design3') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.35, 130, 60, 60);
                    drawText(nameLogo, typeFont, 'normal', nameLogo.length >= 12 ? 30 : 35, 140, 80, colorLogoText, nameFontLink);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 16, 140, 110);
                    }
                }
            }

            if (typeLogo === 'design4') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 1.25, 85, 60, 60);;
                    drawText(nameLogo, typeFont, 'normal',  nameLogo.length >= 12 ? 25 : 30, 105, 110, colorLogoText, nameFontLink);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 14 : 16, 105, 140);
                    }
                }
            }

            if (typeLogo === 'design5') {
                context.beginPath();
                context.arc(140, 80, 50, 0, 2 * Math.PI);
                context.fillStyle = colorDesignLogo;
                context.fill();

                context.beginPath();

                drawText(nameLogo.substring(0, 1), 'fill', 'normal', 50, 135, 95, '#f1f1f1f1', 'Caveat');

                context.beginPath();

                drawText(nameLogo, 'fill', 'normal', nameLogo.length >= 12 ? 30 : 35, 140, 170, colorLogoText, nameFontLink);
                if (nameSlogan) {
                    drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 16, 140, 200);
                }
            }

            if(typeLogo === 'design6'){
                context.beginPath();

                context.moveTo(70, 80);
                context.lineTo(20, 80);
                context.lineTo(20, 160);
                context.lineTo(70, 160);
                context.lineTo(70, 80);

                context.strokeStyle = colorDesignLogo
                context.lineWidth = 3
                context.stroke();

                context.beginPath();

                context.moveTo(250, 80);
                context.lineTo(75, 80);
                context.lineTo(75, 160);
                context.lineTo(250, 160);
                context.lineTo(250, 80);

                context.fillStyle = colorDesignLogo
                context.fill();

                context.beginPath();

                drawText(nameLogo.substring(0, 1), 'fill', 'normal',  40, 45, 140, colorDesignLogo, 'Bad Script');

                context.beginPath();

                drawText(nameLogo, 'fill', 'normal',  nameLogo.length >= 12 ? 20 : 25, 165, 130, '#f1f1f1f1', nameFontLink);
                if (nameSlogan) {
                    drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 20, 135, 190);
                }
            }
            
            if (typeLogo === 'design7') {
                context.beginPath();

                context.moveTo(140, 10);
                context.lineTo(85, 72);
                context.lineTo(140, 135);
                context.lineTo(190, 72);
                context.lineTo(140, 10);
                
                context.strokeStyle = '#000000'
                context.lineWidth = 3;
                context.stroke();

                context.beginPath();

                drawText(nameLogo.substring(0, 1), 'fill', 'normal', 65, 135, 95, colorDesignLogo, 'Zeyada');

                context.beginPath();

                drawText(nameLogo, 'fill', 'normal', nameLogo.length >= 12 ? 30 : 35, 140, 185, colorLogoText, nameFontLink);
                if (nameSlogan) {
                    drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, nameSlogan.length >= 20 ? 18 : 16, 140, 220);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <Container>
            <Menu onClick={handleDownloadImage} />

            <canvas
                width={280}
                height={250}
                style={{ border: '4px solid #000000' }}
                ref={refCanvas}
            />
        </Container>
    )
}

export default Canvas;