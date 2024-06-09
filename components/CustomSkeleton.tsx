import Stack from "@mui/material/Stack";
import {Skeleton} from "@mui/lab";

export default function CustomSkeleton() {
    return (
        <Stack spacing={1} height={'100%'}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" width={"100%"} sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Skeleton variant="rectangular" width={"100%"} height={"40%"} />

            <Skeleton variant="rectangular" width={"100%"} height={"50%"} />
        </Stack>
    );
}