import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { FiChevronDown } from 'react-icons/fi';

const SelectInput = React.forwardRef(
  (
    { className, options, placeholder, error, value, onChange, ...rest },
    ref
  ) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove(event) {
      const { currentTarget, clientX, clientY } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + 'px' : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='p-[2px] rounded-lg transition duration-300 group/input'
      >
        <div className='relative'>
          <Select.Root value={value} onValueChange={onChange} {...rest}>
            <Select.Trigger
              ref={ref}
              className={cn(
                'flex h-10 w-full items-center justify-between border-none rounded-md bg-zinc-800 text-white px-3 py-2 text-sm placeholder:text-neutral-400',
                { 'border-red-500': error },
                className
              )}
            >
              <Select.Value placeholder={placeholder} />
              <Select.Icon>
                <FiChevronDown className='h-4 w-4' />
              </Select.Icon>
            </Select.Trigger>
            <Select.Content className='overflow-hidden border border-zinc-600 bg-zinc-800 rounded-md shadow-lg'>
              <Select.Viewport>
                {options.map(({ value, label }) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className='px-4 py-2 hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer text-white'
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
          {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
        </div>
      </motion.div>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
