import { cn } from '../../lib/utils';

const Button = ({
  children,
  type = 'button',
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'relative group/btn block w-full text-base font-medium rounded-md h-10',
        'transition-all duration-300 ease-in-out transform',
        'text-white tracking-wide shadow-md',
        disabled
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 hover:scale-105',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
