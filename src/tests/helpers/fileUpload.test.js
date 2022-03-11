import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: 'crguerrero',
    api_key: '157714144958265',
    api_secret: 'GPIMfOw_nW727ellZqFiCyuAays',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('Debe cargar un archivo y retornar una URL.', async () => {
        const resp = await fetch('http://img1.wikia.nocookie.net/__cb20110924180338/fma/images/c/ce/Ling_Yao.png');
        const blob = await resp.blob();
        const file = new File([blob], 'Jing-Lao.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Borrar la imagen de cloudinary
        const segments = url.split('/');
        const imageID = segments[segments.length - 1].split('.')[0];

        await cloudinary.v2.api.delete_resources(imageID, {},
            (error, result) => {
                const { deleted } = result;
            }
        );
    });

    test('Debe retornar un error.', async () => {
        const file = new File([], 'Jing-Lao.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
