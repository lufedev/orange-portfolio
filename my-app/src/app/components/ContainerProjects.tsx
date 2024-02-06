import { Project, UserProps } from '../lib/definiton'
import CardProject from './CardProject'

export default function ContainerProjects({
  user,
  filter,
  editable
}: UserProps) {
  const normalizedFilter: string = filter?.toLowerCase() as string
  return (
    <div className="flex flex-col mt-6 md:mt-10 gap-6 md:gap-8 md:grid grid-cols-3">
      {user?.projects
        .filter((project: Project) => {
          const normalizedTags = project.tags.toLowerCase().split(',')
          return (
            normalizedFilter === '' ||
            normalizedTags.some((tag: string) => tag.includes(normalizedFilter))
          )
        })
        .map((project: Project) => (
          <CardProject
            key={'project-' + project.id}
            project={project}
            user={user}
            view={true}
            editable={editable}
          />
        ))}
    </div>
  )
}
