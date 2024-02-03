import { Project, UserProps } from "../lib/definiton";
import CardProject from "./CardProject";

export default function ContainerProjects({user}: UserProps){
    return(
        <div className="h-[19.75rem] w-full mt-[24px] md:flex md:gap-6">
            {
                user?.projects.map( (project: Project, index: number) =>{
                    return <CardProject  key={"project-" + project.id} project={project} user={user} view={true} />;
                })
            }
        </div>
        
    )
}