import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Label from '../ui/Label';
import Input from '../ui/Input';
import Button from '../ui/Button';
import SelectInput from '../ui/SelectInput';
import LabelInputContainer from '../ui/LabelInputContainer';
import TransactionFormSkeleton from '../skeletons/TransactionFormSkeleton';
import { categoryOptions, paymentOptions } from '../../lib/constants';
import { transactionSchema } from '../../lib/schemas';
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from '../../graphql/mutations/transaction.mutation';
import { GET_TRANSACTION } from '../../graphql/queries/transaction.query';

const TransactionForm = ({ transactionId, defaultValues }) => {
  const { id } = useParams();
  const isEditMode = transactionId || id;
  const [transactionData, setTransactionData] = useState(null);

  const [createTransaction, { loading: createLoading }] = useMutation(
    CREATE_TRANSACTION,
    {
      refetchQueries: ['GetTransactions', 'GetCategoryStatistics'],
    }
  );
  const [updateTransaction, { loading: updateLoading }] =
    useMutation(UPDATE_TRANSACTION);
  const [fetchTransaction, { loading: fetchLoading }] = useLazyQuery(
    GET_TRANSACTION,
    {
      onCompleted: (data) => {
        setTransactionData(data.transaction);
      },
    }
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionData ||
      defaultValues || {
        description: '',
        paymentType: 'card',
        category: 'saving',
        amount: '',
        location: '',
        date: '',
      },
  });

  useEffect(() => {
    if (isEditMode) {
      fetchTransaction({ variables: { transactionId: transactionId || id } });
    }
  }, [transactionId, id, fetchTransaction, isEditMode]);

  useEffect(() => {
    if (transactionData) {
      Object.keys(transactionData).forEach((key) => {
        let value = transactionData[key];

        if (key === 'date' && value) {
          const dateObj = new Date(parseInt(value, 10));
          value = dateObj.toISOString().split('T')[0];
        }

        setValue(key, value);
      });
    }
  }, [transactionData, setValue]);

  const onSubmit = async (input) => {
    try {
      if (isEditMode) {
        await updateTransaction({
          variables: {
            input: { transactionId: transactionId || id, ...input },
          },
        });
        toast.success('Transaction updated successfully');
      } else {
        await createTransaction({
          variables: {
            input,
          },
        });
        reset();
        toast.success('Transaction created successfully');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (fetchLoading) {
    return <TransactionFormSkeleton />;
  }

  return (
    <form
      className='w-full max-w-lg flex flex-col gap-4 px-4 sm:px-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='description'>Transaction</Label>
        <Input
          id='description'
          placeholder='Enter transaction description'
          type='text'
          error={errors.description?.message}
          {...register('description')}
        />
      </LabelInputContainer>

      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <LabelInputContainer className='flex-1'>
          <Label htmlFor='paymentType'>Payment Type</Label>
          <Controller
            name='paymentType'
            control={control}
            render={({ field }) => (
              <SelectInput
                id='paymentType'
                placeholder='Select payment type'
                options={paymentOptions}
                error={errors.paymentType?.message}
                {...field}
              />
            )}
          />
        </LabelInputContainer>

        <LabelInputContainer className='flex-1'>
          <Label htmlFor='category'>Category</Label>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <SelectInput
                id='category'
                placeholder='Select category'
                options={categoryOptions}
                error={errors.category?.message}
                {...field}
              />
            )}
          />
        </LabelInputContainer>

        <LabelInputContainer className='flex-1'>
          <Label htmlFor='amount'>Amount ($)</Label>
          <Input
            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            id='amount'
            placeholder='Enter amount'
            type='number'
            error={errors.amount?.message}
            {...register('amount')}
          />
        </LabelInputContainer>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 mb-8'>
        <LabelInputContainer className='flex-1'>
          <Label htmlFor='location'>Location</Label>
          <Input
            id='location'
            placeholder='Enter location'
            type='text'
            error={errors.location?.message}
            {...register('location')}
          />
        </LabelInputContainer>

        <LabelInputContainer className='flex-1'>
          <Label htmlFor='date'>Date</Label>
          <Input
            className='block'
            id='date'
            type='date'
            placeholder='Select date'
            error={errors.date?.message}
            {...register('date')}
          />
        </LabelInputContainer>
      </div>

      <Button disabled={createLoading || updateLoading} type='submit'>
        {isEditMode ? 'Update Transaction' : 'Create Transaction'}
      </Button>
    </form>
  );
};

export default TransactionForm;
