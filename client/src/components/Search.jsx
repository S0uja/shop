import React, { useState } from "react";
import { InputBase, Paper, IconButton, Box, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [alignment, setAlignment] = useState("left");
    const [selectSort, setSelectSort] = useState(10);
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleSelectSort = (event) => setSelectSort(event.target.value);

    return (
        <>
            <Paper
                sx={{
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17))",
                    flexGrow: 1,
                    p: 1,
                    borderRadius: 4,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                }}
                elevation={3}
            >
                <Grid
                    container
                    spacing={1}
                    sx={{ width: "100%" }}
                >
                    <Grid
                        xs={12}
                        sm={12}
                        md={12}
                        lg={7}
                        xl={7}
                    >
                        <Box
                            sx={{
                                border: "1px solid #ebebeb",
                                maxWidth: 970,
                                display: "flex",
                                borderRadius: 3,
                                flexGrow: 1,
                                height: "40px",
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, width: "85%", flexGrow: 1 }}
                                placeholder="Поиск..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <IconButton
                                type="submit"
                                sx={{ p: 1 }}
                                aria-label="search"
                            >
                                <SearchIcon size="small" />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid
                        xs={8}
                        sm={8}
                        md={8}
                        lg={4}
                        xl={4}
                        sx={{
                            display: "flex",
                            justifyContent: {
                                xs: "start",
                                sm: "start",
                                md: "start",
                                lg: "center",
                                xl: "center"
                            }
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <Select
                                value={selectSort}
                                onChange={handleSelectSort}
                                displayEmpty
                                sx={{
                                    borderRadius: 4,
                                    height: "40px",
                                    border: "1px solid #ebebeb",
                                }}
                            >
                                <MenuItem value={10}>По рейтингу</MenuItem>
                                <MenuItem value={20}>По стоимости ↓</MenuItem>
                                <MenuItem value={30}>По стоимости ↑</MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                    <Grid
                        xs={4}
                        sm={4}
                        md={4}
                        lg={1}
                        xl={1}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Box
                            sx={{
                                border: "1px solid #ebebeb",
                                display: "flex",
                                borderRadius: 3,
                                width: "90px    ",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "40px",
                            }}
                        >
                            <ToggleButtonGroup
                                value={alignment}
                                exclusive
                                onChange={handleAlignment}
                                aria-label="text alignment"
                                sx={{
                                    height: "40px",
                                    borderRadius: 3,
                                }}
                            >
                                <ToggleButton
                                    value="left"
                                    aria-label="left aligned"
                                    sx={{ borderRadius: 3, border: "none" }}
                                >
                                    <ViewListIcon />
                                </ToggleButton>
                                <ToggleButton
                                    value="right"
                                    aria-label="right aligned"
                                    sx={{ borderRadius: 3, border: "none" }}
                                >
                                    <ViewModuleIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
