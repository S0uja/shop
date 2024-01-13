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
            sx={{ width: { xs: 130, sm: 150, md: 170, lg: 200 } }}
            elevation={0}
            variant="outlined"
        >
            {/* Картинка */}
            <CardMedia
                sx={{
                    height: { xs: 130, sm: 150, md: 170, lg: 200 },
                    borderRadius: 1,
                }}
                image={img}
                title={name}
            />

            {/* Расширения */}
            <Chip
                label="Лучшая цена"
                color="success"
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
						xs:10,
						sm:13,
						md:15,
						lg:17,
						xl:17
					},
                    fontWeight: 600,
                    height: {
						xs:20,
						sm:30,
						md:40,
						lg:45,
						xl:45
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

            {/* Описание */}
            <Grid
                container
                sx={{
                    px: 1,
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Grid
                    xs={6}
                    sx={{
                        fontWeight: 500,
                        fontSize: 12,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: 40,
                    }}
                    color="text.secondary"
                >
                    Махеев
                </Grid>
                <Grid
                    xs={6}
                    sx={{ fontSize: 12, fontWeight: 600 }}
                    color="text.secondary"
                >
                    300гр
                </Grid>
            </Grid>

            {/* Кнопки */}
            <Box
                sx={{
                    display: "flex",
                    p: 1,
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Fab
					variant='extended'
					size="small"
                    label={`${price}₽`}
                    color="success"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 800,
                        flexGrow: 3,
						fontSize: {
							xs:10,
							sm:12,
							md:13,
							lg:14,
							xl:14
						},
                    }}
                >
					<AddIcon fontSize="small"/>
					Купить
				</Fab>
                {/* <Fab 
					variant="extended"
                    color="secondary"
                    size='small'
                >
					<FavoriteIcon sx={{fontSize:15}}/>
				</Fab> */}
            </Box>
        </Card>
    );
}
