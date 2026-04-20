import prismaClient from '../../prisma';

interface DetailOrderServiceProps {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              amount: true,
              createdAt: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                  disabled: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!order) {
        throw new Error('Pedido não encontrado.');
      }

      return order;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('Falha ao buscar detalhes do pedido.');
    }
  }
}

export { DetailOrderService };
