import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Categories() {
    const [openCategory, setOpenCategory] = useState(-1);

    const handleClick = (value) => {
      if (value===openCategory){
        setOpenCategory(-1);
        return
      } 
      setOpenCategory(value);
    };
    const [category, setCategory] = useState("Кондитерское изделие");

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    flexGrow: 1,
                    borderRadius: 4,
                    height: "100%",
                    p: 1,
                    width: "100%",
                    display: { xs: "none", sm: "none", md: "block" },
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17))",
                }}
            >
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "none",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                            sx={{background:'none',fontSize:'22px',fontWeight:700}}
                        >
                            Категории
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={()=>handleClick(0)}>
                        <ListItemIcon>1</ListItemIcon>
                        <ListItemText primary="Первый" />
                        {openCategory===0 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openCategory===0}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>ffff</ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={()=>handleClick(1)}>
                        <ListItemIcon>2</ListItemIcon>
                        <ListItemText primary="Второй" />
                        {openCategory===1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openCategory===1}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>ffff</ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={()=>handleClick(2)}>
                        <ListItemIcon>3</ListItemIcon>
                        <ListItemText primary="Третий" />
                        {openCategory===2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openCategory===2}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>ffff</ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={()=>handleClick(3)}>
                        <ListItemIcon>4</ListItemIcon>
                        <ListItemText primary="Четвертый" />
                        {openCategory===3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openCategory===3}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>ffff</ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                </List>
            </Paper>

            <Accordion
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                    borderRadius: 4,
                    "&:before": {
                        display: "none",
                    },
                    "&:last-of-type": {
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                    },
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17))",
                    overflow: "hidden",
                }}
                disableGutters
                elevation={3}
                borderRadius={4}
            >
                <AccordionSummary sx={{ borderRadius: 4, overflow: "hidden" }}>
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Категория
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        {category}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ borderRadius: 4, overflow: "hidden" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </AccordionDetails>
            </Accordion>
        </>
    );
}
