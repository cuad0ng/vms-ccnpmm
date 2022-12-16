import React from 'react'
import {
    Box,
    Stack,
    Button,
    Typography,
} from '@mui/material'
import {Link} from "react-router-dom"
import "./Error.scss"

function Error() {
    return (
        <Box>
            <center>
                <Typography fontSize={"30"}>Đường dẫn không tồn tại</Typography>
                <Typography fontSize={"30"}>Bạn có thể thử những liên kết sau</Typography>
            </center>
        </Box>
    )
}
export default Error