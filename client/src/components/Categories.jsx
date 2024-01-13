import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Categories() {
    const [category,setCategory] = useState('Кондитерское изделие')
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          flexGrow: 1,
          borderRadius: 1,
          height: "100%",
          width: "100%",
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        dwdawdaw
      </Paper>

      <Accordion
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          borderRadius: 1,
          '&:before': {
            display: 'none',
          }
        }}
        disableGutters
        elevation={1}
      >
        <AccordionSummary>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Категория
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {category}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionDetails>
      </Accordion>
    </>
  );
}
