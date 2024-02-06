'use client'
import React, { useEffect, useState } from 'react'
import AvatarUser from '.././assets/img/avatar.svg'
import { User, Project } from '../lib/definiton'
import ContainerProjects from '../components/ContainerProjects'
import Header from '../components/Header'
import { ThemeProvider } from 'styled-components'
import { TextField } from '@mui/material'
import { TextFieldTheme } from '../themes/TextField'

export default function Discover() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tagFilter, setTagFilter] = useState('')
  const [country, setCountry] = useState<string>('')
  const [user, setUser] = useState<User>({} as User)
  console.log(country)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/portfolio/all')

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
          //@ts-expect-error Não consigo resolver, e é necessário para compilar
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
  const filterProjectsByTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(event.target.value)
  }

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage))
    }
  }, [])

  const userMap: Map<string, User> = new Map<string, User>()
  projects.forEach((project) => {
    //@ts-expect-error Não consigo resolver, e é necessário para compilar
    const email = project.email
    const name = project.usuario

    if (userMap.has(email)) {
      const existingUser = userMap.get(email) as User
      existingUser.projects.push(project)
    } else {
      const newUser: User = {
        name,
        email,
        projects: [project],
        image: AvatarUser,
        sname: '',
        password: '',
        country: ''
      }
      userMap.set(email, newUser)
    }
  })
  const users: User[] = Array.from(userMap.values())

  return (
    <div>
      <Header user={user} />
      <div className="flex flex-col items-center justify-start mt-16 mx-6 gap-10 md:mt-28">
        <h4 className="h4 text-center">
          Junte-se à comunidade de inovação, inspiração e descobertas,
          transformando experiências em conexões inesquecíveis
        </h4>
        <div className="w-full mb-9 md:mb-[77px]">
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              name="Buscar tags"
              label="Buscar tags"
              variant="outlined"
              size="medium"
              className="w-full md:max-w-[723px]"
              type="text"
              value={tagFilter}
              onChange={filterProjectsByTag}
            />
            {users.map((user: User) => (
              <ContainerProjects
                key={user.email}
                editable={false}
                user={user}
                filter={tagFilter}
              />
            ))}
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}
