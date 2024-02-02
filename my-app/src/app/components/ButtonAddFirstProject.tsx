
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { DisabledTheme } from '../themes/Button'
import { ProjectProps } from '../lib/definiton'


export default function ButtonFirstProject({onClick}: ProjectProps) {
    return (

        <div className="w-full h-[16rem] mt-6 md:w-[389px]">
            <ThemeProvider theme={DisabledTheme}>
                <Button
                    color='secondary'
                    component="label"
                    disableElevation
                    variant="contained"
                    className="w-full h-full leading-[0.875rem] tracking-[0.01563rem] font-normal normal-case"
                    onClick={onClick}
                >
                    <div className="w-full md:w-[16rem] text-left flex flex-col my-[4.25rem] mx-[1.31rem] gap-4">
                        <PhotoLibraryIcon className="text-5xl text-color-neutral-120 m-auto" />

                        <p>
                            Adicione seu primeiro projeto
                        </p>
                        <p>
                            Compartilhe seu talento com milhares de pessoas
                        </p>
                    </div>

                </Button>
            </ThemeProvider>
        </div>
    )
}