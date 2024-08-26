import Skeleton from '../ui/Skeleton';
import LabelInputContainer from '../ui/LabelInputContainer';

const TransactionFormSkeleton = () => {
  return (
    <div className='w-full max-w-lg flex flex-col gap-4 px-3'>
      <LabelInputContainer className='mb-4'>
        <Skeleton className='h-5 w-1/3 mb-2 rounded-md' />
        <Skeleton className='h-10 w-full rounded-md' />
      </LabelInputContainer>

      <div className='flex gap-2 mb-4'>
        <LabelInputContainer>
          <Skeleton className='h-5 w-1/2 mb-2 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </LabelInputContainer>

        <LabelInputContainer>
          <Skeleton className='h-5 w-1/2 mb-2 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </LabelInputContainer>

        <LabelInputContainer>
          <Skeleton className='h-5 w-1/2 mb-2 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </LabelInputContainer>
      </div>

      <div className='flex gap-2 mb-8'>
        <LabelInputContainer>
          <Skeleton className='h-5 w-1/2 mb-2 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </LabelInputContainer>

        <LabelInputContainer>
          <Skeleton className='h-5 w-1/2 mb-2 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </LabelInputContainer>
      </div>

      <Skeleton className='h-10 w-full rounded-md' />
    </div>
  );
};

export default TransactionFormSkeleton;
