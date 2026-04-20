import z from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: 'O número da mesa é obrigatório.' })
      .int({ message: 'O número da mesa deve ser um número inteiro.' })
      .positive({ message: 'O número da mesa deve ser maior que 0.' }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: 'O pedido deve ser um texto.' })
      .min(1, { message: 'O ID do pedido é obrigatório.' }),
    product_id: z
      .string({ message: 'O produto deve ser um texto.' })
      .min(1, { message: 'O ID do produto é obrigatório.' }),
    amount: z
      .number()
      .int('Quantidade deve ser um número inteiro.')
      .positive('Quantidade deve ser um número positivo.'),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z
      .string({ message: 'O ID do item é obrigatório.' })
      .min(1, { message: 'O ID do item é obrigatório.' }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: 'O ID do pedido é obrigatório.' })
      .min(1, { message: 'O ID do pedido é obrigatório.' }),
  }),
});

export const finishOrderSchema = z.object({
  body: z.object({
    order_id: z.string({ message: 'O ID do pedido é obrigatório.' }),
  }),
});
