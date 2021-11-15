import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import CollectionItem from "../collection-item/collection-item";

const CollectionPreview = ({ title, items }) => (
  <Accordion sx={{backgroundColor:"#F3F0D7",color:"#FF7878"}} >
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <h1 style={{ fontSize: "28px", marginBottom: "25px" }}>
        {title.toUpperCase()}
      </h1>
    </AccordionSummary>
    <AccordionDetails>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {items
            .filter((item, idx) => idx < 4)
            .map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
        </div>
      </div>
    </AccordionDetails>
  </Accordion>
);

export default CollectionPreview;
