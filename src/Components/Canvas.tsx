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
    colorIcon: string[];
}

const Canvas = ({ urlImage, typeLogo, nameLogo, nameSlogan, typeFontSlogan, linkFontName, nameFontLink, colorIcon, typeFont }: CanvasProps) => {

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

            context.beginPath();

            const drawText = (name: string, type: 'stroke' | 'fill', fontStyle: 'normal' | 'oblique' | 'italic', size: number, coordinatesX: number, coordinatesY: number) => {
                context.textAlign = 'center';
                context.fillStyle = colorIcon[0];
                context.font = `${fontStyle} ${size}px ${nameFontLink}`;

                if (type === 'stroke') {
                    context.strokeText(name, coordinatesX, coordinatesY);
                } else {
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
                    context.drawImage(image, image.width / 2.9, 30, 100, 100);
                    context.beginPath();
                    drawText(nameLogo, typeFont, 'normal', 40, 140, 160);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 190);
                    }
                }
            }

            if (typeLogo === 'type2') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.9, 60, 100, 100);
                    drawText(nameLogo, typeFont, 'normal', 40, 140, 70);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 170);
                    }
                }
            }


            if (typeLogo === 'type3') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 2.9, 80, 100, 100);
                    drawText(nameLogo, typeFont, 'normal', 50, 140, 70);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 16, 140, 90);
                    }
                }
            }

            if (typeLogo === 'type4') {
                image.src = urlImage;
                image.onload = () => {
                    context.drawImage(image, image.width / 1.55, 65, 100, 100);
                    drawText(nameLogo, typeFont, 'normal', 35, 80, 120);
                    if (nameSlogan) {
                        drawTextSlogan(nameSlogan, 'fill', 'normal', typeFontSlogan, 20, 80, 140);
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