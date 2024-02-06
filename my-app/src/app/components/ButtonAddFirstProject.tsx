import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { DisabledTheme } from '../themes/Button'
import { ProjectProps } from '../lib/definiton'
import CustomSkeleton from '../components/CustomSkeleton'

export default function ButtonFirstProject({ onClick }: ProjectProps) {
  return (
    <div className="flex grid-cols-3 w-full gap-6 mt-6 md:grid md:mt-10">
      <ThemeProvider theme={DisabledTheme}>
        <Button
          color="secondary"
          component="label"
          disableElevation
          variant="contained"
          className="w-full leading-[0.875rem] h-[16.125rem] tracking-[0.01563rem] font-normal normal-case"
          onClick={onClick}
        >
          <div className="text-left flex flex-col my-[4.25rem] mx-[1.31rem] gap-4">
            <PhotoLibraryIcon className="text-5xl text-color-neutral-120 m-auto" />

            <p>Adicione seu primeiro projeto</p>
            <p>Compartilhe seu talento com milhares de pessoas</p>
          </div>
        </Button>
      </ThemeProvider>
      <CustomSkeleton></CustomSkeleton>
      <CustomSkeleton></CustomSkeleton>
    </div>
  )
}
