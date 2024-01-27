import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";

export default function CatalogCard({ name, price, img, chip }) {
    return (
        <Card
            sx={{
                width: { xs: 130, sm: 150, md: 170, lg: 200 },
                borderRadius: 4,
                backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17))",
                border: "1px solid #ebebeb",
            }}
            elevation={0}
            color="grey"
        >
            {/* Картинка */}
            <CardMedia
                sx={{
                    height: { xs: 130, sm: 150, md: 170, lg: 200 },
                    borderRadius: 4,
                }}
                image={img}
                title={name}
            />

            {/* Расширения */}
            <Chip
                label="Лучшая цена"
                color="warning"
                size="small"
                sx={{
                    position: "absolute",
                    mt: "-30px",
                    ml: 1,
                    fontSize: {
                        xs: 8,
                        sm: 12,
                        md: 14,
                        lg: 14,
                    },
                }}
                icon={<LocalFireDepartmentIcon fontSize={"small"} />}
            />

            {/* Название */}
            <Typography
                variant="h7"
                component="div"
                sx={{
                    fontSize: {
                        xs: 10,
                        sm: 13,
                        md: 15,
                        lg: 17,
                        xl: 17,
                    },
                    fontWeight: 600,
                    height: {
                        xs: 20,
                        sm: 30,
                        md: 40,
                        lg: 45,
                        xl: 45,
                    },
                    flexWrap: "wrap",
                    wordWrap: "break-word",
                    lineClamp: 2,
                    overflow: "hidden",
                    p: 1,
                }}
            >
                {name}awdawdawdawhdy adgyauiduyg ftguhihygtf
            </Typography>

            {/* Кнопки */}
            <Box
                sx={{
                    display: "flex",
                    p: 1,
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Chip
                    variant="extended"
                    size="medium"
                    color="success"
                    elevation={0}
                    label={`${price}₽`}
                    icon={<AddIcon fontSize="small" />}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 700,
                        flexGrow: 3,
                        fontSize: {
                            xs: 14,
                            sm: 14,
                            md: 15,
                            lg: 17,
                            xl: 17,
                        },
                    }}
                >
                    {price}₽
                </Chip>
            </Box>
        </Card>
    );
}
