'use client'
import React, { useEffect, useState } from 'react'
import CardProfile from '../components/CardProfile'
import Header from '../components/Header'
import AvatarUser from '.././assets/img/avatar.svg'
import { User, Session, Project } from '../lib/definiton'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import ModalAddProject from '../components/ModalAddProject'
import ContainerProjects from '../components/ContainerProjects'
import ButtonFirstProject from '../components/ButtonAddFirstProject'
import CustomSkeleton from '../components/CustomSkeleton'

export default function Home({ sessionData }: Session) {
  const [projects, setProjects] = useState<Project[]>([])
  const [tagFilter, setTagFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [country, setCountry] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio')

        if (!response.ok) {
          throw new Error('Erro ao obter os dados da API')
        }
        const data = await response.json()
        data.data.map((project: Project) => {
          const date = new Date(project.date)
          const options = {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit'
          }
          //@ts-expect-error  Sobrecarga Inválida no options
          project.date = date.toLocaleDateString('en-US', options)
        })
        setProjects(data.data)
      } catch (error) {
        console.error('Erro ao obter dados:', error.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then((response) => response.json())
      .then((data) => {
        setCountry(data.country)
      })
      .catch((error) => console.error('Erro ao obter o nome do país:', error))
  }, [])


  const user: User = {
    name: sessionData.name,
    email: sessionData.email,
    projects: projects,
    image: AvatarUser,
    sname: '',
    password: '',
    country: country || 'Brasil'
  }


  useEffect(() => {
   
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const filterProjectsByTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(event.target.value)
  }


  const isProject: boolean = user.projects.length > 0

  return (
    <div>
      <Header user={user} />
      <div className="flex flex-col items-center justify-start mt-14 md:mt-28 px-6 gap-10 md:gap-14 md:px-8">
        <CardProfile user={user} onClick={openModal} />
        <ModalAddProject
          editing={false}
          user={user}
          states={modalOpen}
          onClose={closeModal}
        />
        <div className="w-full mb-[43px] md:mb-[39px]">
          <h4 className="h6 text-color-neutral-130 mb-4">Meus projetos</h4>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              name="Buscar tags"
              label="Buscar tags"
              variant="outlined"
              size="medium"
              className="w-full md:w-[32rem]"
              type="text"
              value={tagFilter}
              onChange={filterProjectsByTag}
            />
          </ThemeProvider>
          {isProject ? (
            <ContainerProjects user={user} filter={tagFilter} editable={true} />
          ) : (
            <>
              <div className="w-full flex flex-row flex-wrap gap-6 items-end">
                <ButtonFirstProject onClick={openModal} editing={false} />
                <CustomSkeleton />
                <CustomSkeleton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
