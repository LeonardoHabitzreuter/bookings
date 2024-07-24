import { ModalProps } from '@mantine/core';
import { Modal as PrimitiveModal } from '@mantine/core';

export default function Modal (props: ModalProps) {
  return (
    <PrimitiveModal
      centered
      styles={{ content: { borderRadius: '12px' } }}
      classNames={{ body: 'flex flex-col items-center px-10 space-y-3 text-center' }}
      {...props}
    />
  )
}