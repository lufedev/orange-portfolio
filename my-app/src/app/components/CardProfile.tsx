import Image from 'next/image'
import CustomButton from './CustomButton'
import { UserProps } from '../lib/definiton'

export default function CardProfile({ user, onClick }: UserProps) {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-[42px]">
      <Image
        src={user.image}
        alt={user.name}
        width={122}
        height={122}
        className="mb-4"
      />
      <div className="flex flex-col md:items-start gap-2 md:gap-0">
        <h3 className="h5 text-color-neutral-120 mb-0 md:mb-4">
          {user.name} {user.sname}
        </h3>
        <p className="subtitle-1 text-color-neutral-130 mb-0 md:mb-6">
          {user.country}
        </p>
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
