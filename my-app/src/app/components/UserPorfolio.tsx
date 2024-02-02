'use client'

import { useEffect, useState } from 'react'
import { Project } from '../lib/definiton'
import { Link, Stack, Typography } from '@mui/material'

export default function UserPortfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/portfolio')

        if (!response.ok) {
          throw new Error('Erro ao obter os dados da API')
        }
        const data = await response.json()
        setProjects(data.data)
      } catch (error) {
        console.error('Erro ao obter dados:', error.message)
      }
    }

    fetchData()
  }, [])
  return (
    <Stack direction="row" spacing={13}>
      {projects.map((project) => (
        <Stack key={project.id} direction="column" spacing={1}>
          <Typography variant="h6">{project.title}</Typography>
          <Typography variant="body1">{project.description}</Typography>
          <Typography variant="body2">Tags: {project.tags}</Typography>
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </Link>
        </Stack>
      ))}
    </Stack>
  )
}
