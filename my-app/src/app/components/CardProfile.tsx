import Image from 'next/image'
import CustomButton from './CustomButton';
import { UserProps } from '../lib/definiton';
import { DisabledTheme } from '../themes/Button';
import { ThemeProvider } from '@mui/material/styles'

export default function CardProfile({ user, onClick }: UserProps) {
    return (
        <div className="inline-flex flex-wrap mx-auto justify-around content-around items-start">
            <Image
                src={user.image}
                alt={user.name}
                width={122}
                height={122}
                className="mr-6 mb-[16px]"
            />
            <div className="flex flex-col items-start justify-start h-full gap-4 font-normal">
                <section>
                    <h3 className='h5 text-color-neutral-120'>{user.name} {user.surname}</h3>
                    <p className='mt-[8px] text-color-neutral-130'>{user.country}</p>
                </section>

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