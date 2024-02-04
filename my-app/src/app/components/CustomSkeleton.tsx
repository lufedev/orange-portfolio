import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { SkeletonTheme } from '../themes/Button';
import { ThemeProvider } from '@mui/material';

export default function CustomSkeleton() {
    return (
        <Stack spacing={1} width={389} className="hidden xl:block">
            <ThemeProvider theme={SkeletonTheme}>
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={389}
                    height={258}
                    className='rounded'
                    color="primary"
                />
                {/* <Stack spacing={2} className="flex flex-row  justify-between">
                <div className="flex flex-row items-center justify-between gap-2">
                    <Skeleton variant="circular" animation="wave" width={40} height={40} />
                    <Skeleton variant="text" animation="wave" width={100} height={60} />
                </div>
                <div className="flex flex-row items-start justify-between	gap-2">
                    <Skeleton variant="rounded" animation="wave" width={46} height={32} className='rounded-full' />
                    <Skeleton variant="rounded" animation="wave" width={46} height={32} className='rounded-full' />
                </div>

            </Stack> */}
            </ThemeProvider>


        </Stack>
    );
}