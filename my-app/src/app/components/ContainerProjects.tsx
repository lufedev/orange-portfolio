import { Project, UserProps } from '../lib/definiton';
import CardProject from './CardProject';


export default function ContainerProjects({ user, filter }: UserProps) {
  const normalizedFilter: string = filter?.toLowerCase() as string;

  return (
    <div className="h-[19.75rem] w-full mt-[24px] md:flex md:gap-6 md:flex-wrap">
      {user?.projects
        .filter((project: Project) => {
          const normalizedTags = project.tags.toLowerCase().split(','); 
          return normalizedFilter === '' || normalizedTags.some((tag: string)=> tag.includes(normalizedFilter));
        })
        .map((project: Project, index: number) => (
          <CardProject
            key={'project-' + project.id}
            project={project}
            user={user}
            view={true}
          />
        ))}
    </div>
  );
}