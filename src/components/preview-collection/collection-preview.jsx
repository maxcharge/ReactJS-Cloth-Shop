import React from "react";
import CollectionItem from "../collection-item/collection-item";

const CollectionPreview = ({ title, items }) => (
  <div
    style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}
  >
    <h1 style={{ fontSize: "28px", marginBottom: "25px" }}>
      {title.toUpperCase()}
    </h1>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
