import { hash } from 'bcryptjs';
import prismaClient from '../prisma';

interface CreateUserProps {
  name: String;
  email: String;
  password: String;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Usuário já existente.');
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });

    return user.name;
  }
}

export { CreateUserService };
