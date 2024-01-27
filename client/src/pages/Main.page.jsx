import Header from "../components/Header.jsx";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import React from "react";
import CatalogCard from "../components/CatalogCart.jsx";
import Box from "@mui/material/Box";
import Categories from "../components/Categories.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Search from "../components/Search.jsx";
import { responsiveFontSizes } from "@mui/material/styles";

function MainPage() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    let theme = React.useMemo(
        () =>
            createTheme({
                palette: { mode: prefersDarkMode ? "dark" : "light" },
            }),
        [prefersDarkMode]
    );
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box
                sx={{
                    width: { xs: 300, sm: 500, md: 850, lg: 1200, xl: 1400 },
                    mt: 10,
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                    >
                        <Categories />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}
                        sx={{ ml: { md: 2, lg: 2, xl: 2 } }}
                    >
                        <Search />
                        <Paper
                            sx={{
                                backgroundImage:
                                    "linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17))",
                                flexGrow: 1,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                justifyContent: "space-between",
                                p: 1,
                                borderRadius: 4,
                            }}
                            elevation={3}
                        >
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                            <CatalogCard
                                name={"Пироженное"}
                                img={
                                    "https://cdn.culture.ru/images/23a32559-3a96-5596-95f5-cfa38ec2b3b4"
                                }
                                price={3000}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default MainPage;
