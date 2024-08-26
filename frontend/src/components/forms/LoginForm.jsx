import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Button from '../ui/Button';
import LabelInputContainer from '../ui/LabelInputContainer';
import { loginSchema } from '../../lib/schemas';
import { LOGIN } from '../../graphql/mutations/user.mutation';

const LoginForm = () => {
  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ['GetAuthenticatedUser'],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (input) => {
    try {
      await login({
        variables: {
          input,
        },
      });
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='username'>Username</Label>
        <Input
          id='username'
          placeholder='Your username'
          type='text'
          error={errors.username?.message}
          {...register('username')}
        />
      </LabelInputContainer>

      <LabelInputContainer className='mb-8'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          placeholder='••••••••'
          type='password'
          error={errors.password?.message}
          {...register('password')}
        />
      </LabelInputContainer>

      <Button disabled={loading} type='submit'>
        Log in &rarr;
      </Button>

      <div className='bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full' />
    </form>
  );
};

export default LoginForm;
