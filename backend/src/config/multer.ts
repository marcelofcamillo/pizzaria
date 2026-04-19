import multer from 'multer';

// usar o memoryStorage para manter o arquivo em memória e enviar diretamente para o Cloudinary
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
      const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error('Formato de arquivo inválidp. Use apenas JPEG, JPG e PNG.'),
        );
      }
    },
  },
};
