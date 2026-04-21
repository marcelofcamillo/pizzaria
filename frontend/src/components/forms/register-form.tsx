import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function RegisterForm() {
  return (
    <Card className='bg-app-card border border-app-border w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-white text-center text-3xl sm:text-4xl font-bold'>
          Sujeito<span className='text-red-700'>Pizza</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-white'>
              Nome
            </Label>
            <Input
              type='text'
              id='name'
              placeholder='Digite o seu nome'
              required
              className='text-white bg-app-card border border-app-border'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-white'>
              E-mail
            </Label>
            <Input
              type='email'
              id='email'
              placeholder='Digite o seu e-mail'
              required
              minLength={3}
              className='text-white bg-app-card border border-app-border'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-white'>
              Senha
            </Label>
            <Input
              type='password'
              id='password'
              placeholder='Digite a sua senha'
              required
              minLength={3}
              className='text-white bg-app-card border border-app-border'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-red-700 text-white hover:bg-red-700'
          >
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
