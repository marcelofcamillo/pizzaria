'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Button, buttonVariants } from '../ui/button';

import { Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { createCategoryAction } from '@/actions/categories';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function CategoryForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await createCategoryAction(formData);

    if (result.success) {
      setOpen(false);
      router.refresh();

      return;
    } else {
      console.log(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          'bg-red-700 hover:bg-red-800 font-semibold',
        )}
      >
        <Plus className='h-5 w-5 mr-2' />
        Nova categoria
      </DialogTrigger>

      <DialogContent className='p-4 bg-app-card text-white'>
        <DialogHeader>
          <DialogTitle>Criar nova categoria</DialogTitle>
          <DialogDescription>Criando nova categoria</DialogDescription>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleCreateCategory}>
          <div>
            <Label htmlFor='category' className='mb-2'>
              Nome da categoria
            </Label>
            <Input
              id='name'
              name='name'
              required
              placeholder='Digite o nome da categoria...'
              className='border-app-border bg-app-background text-white'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-red-700 text-white hover:bg-red-800'
          >
            Criar categoria
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
