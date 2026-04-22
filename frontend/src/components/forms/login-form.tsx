'use client';
import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { loginAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  return (
    <Card className='bg-app-card border border-app-border w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-white text-center text-3xl sm:text-4xl font-bold'>
          Sujeito<span className='text-red-700'>Pizza</span>
        </CardTitle>
        <CardDescription className='text-white text-center font-extralight'>
          Preencha os dados para acessar a sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-4' action={formAction}>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-white'>
              E-mail
            </Label>
            <Input
              type='email'
              id='email'
              name='email'
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
              name='password'
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
            {isPending ? 'Acessando conta...' : 'Acessar'}
          </Button>

          {state?.error && (
            <div className='text-sm text-red-700 bg-red-50 p-3 rounded-md text-center'>
              {state.error}
            </div>
          )}

          <p className='text-center text-sm text-gray-100'>
            Ainda não possui uma conta?{' '}
            <Link href='/register' className='text-red-600'>
              Crie uma conta
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
