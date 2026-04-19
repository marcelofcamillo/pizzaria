import z from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'O nome do produto é obrigatório.' })
      .min(3, { message: 'O nome do produto precisa ter no mínimo 3 letras.' }),
    price: z
      .string()
      .min(3, { message: 'O valor do produto é obrigatório.' })
      .regex(/^\d+$/),
    description: z
      .string({ message: 'A descrição do produto é obrigatória.' })
      .min(3, {
        message: 'A descrição do produto precisa ter no mínimo 3 letras.',
      }),
    category_id: z.string({ message: 'A categoria do produto é obrigatória.' }),
  }),
});
