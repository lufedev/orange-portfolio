import Image from 'next/image'
import CustomButton from './CustomButton'
import { UserProps } from '../lib/definiton'

export default function CardProfile({ user, onClick }: UserProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.image}
        alt={user.name}
        width={122}
        height={122}
        className="mb-4"
      />
      <div>
        <h3 className="h5 text-color-neutral-120 mb-2">
          {user.name} {user.surname}
        </h3>
        <p className="subtitle-1 text-color-neutral-130 mb-2">{user.country}</p>
        <CustomButton
          theme="disabled"
          variant="contained"
          color="primary"
          size="large"
          disabled={false}
          name="ADICIONAR PROJETO"
          loading={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
