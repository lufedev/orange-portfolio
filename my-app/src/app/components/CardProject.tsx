import Image from "next/image";
import { UserProps } from "../lib/definiton";
import { Chip, Stack, ThemeProvider } from "@mui/material";
import { ChipTheme } from "../themes/Button";

export default function CardProject({ user, project }: UserProps) {

    return (
        <div className="h-[19.75rem] w-full md:w-[24.31rem] md:h-[17.87rem] mt-6">
            <Image
                src={project?.urlImage}
                alt={project?.title}
                width={312}
                height={258}
                className="w-full h-[16.12rem] object-cover"
            />
            <div className="flex mt-[.5rem] md:items-center gap-2">
                <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="my-[.31rem]"
                />
                <div className="flex flex-col md:flex-row gap-2">
                    <h6 className="h6 text-color-neutral-120 md:text-color-neutral-110">
                        {user.name} {user.surname}
                    </h6>
                    <p className="hidden md:flex">
                        •
                    </p>
                    <p className="text-color-neutral-110">
                        {project?.date}
                    </p>
                </div>

                <Stack direction="row" spacing={1} className="flex items-center grow justify-end">
                    <ThemeProvider theme={ChipTheme}>
                    {
                        project?.tags.map((tag: string) => {
                           return <Chip label={tag} color="primary" />
                        })
                    }
                    </ThemeProvider>
                </Stack>
            </div>
        </div>
    )
}