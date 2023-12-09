'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui';

import { signInResolver, SignInSchema } from '@/schema';
import { useSignInModal, useSignUpModal } from '@/store';

export function SignInForm() {
  const router = useRouter();
  const { isOpen: isSignInOpen, onClose: onSignInClose } = useSignInModal();
  const { onOpen: onSignUpOpen } = useSignUpModal();
  const form = useForm<SignInSchema>({
    resolver: signInResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSignUp = (data: SignInSchema) => {
    console.log('submit!', data);
  };

  const toSignUpHandler = () => {
    if (isSignInOpen) {
      onSignInClose();
      onSignUpOpen();
      return;
    }

    router.push('/signup');
  };

  return (
    <div>
      <Heading center>Welcome Back!</Heading>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSignUp)} className='space-y-6  mt-8'>
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@gmail.com'
                    {...field}
                    className='text-sm md:text-base'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Password'
                    {...field}
                    className='text-sm md:text-base'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-center'>
            <Button type='submit' size={'lg'} className='text-lg'>
              Sign In
            </Button>
          </div>
        </form>
      </Form>

      <div className='text-center mt-8 text-neutral-500 font-light'>
        <p>Don&apos;t have account yet?</p>
        <button
          className='text-neutral-800 cursor-pointer hover:underline'
          onClick={toSignUpHandler}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
