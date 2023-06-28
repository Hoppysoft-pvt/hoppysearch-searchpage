import React from "react";
import { ListItemText } from "@mui/material";

const ListItemTextWithHighlightedText = ({ primary, secondary, highlightedWords }) => {

  const highlightText = (text) => {
    if (!text) {
      text = ""
    }
    const regex = new RegExp(`(${highlightedWords.join("|")})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, i) =>
      highlightedWords.includes(part.toLowerCase()) ? (
        <span key={i} style={{color:"#3f51b5", fontWeight: "bold"}}>
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  };

  return (
    <ListItemText
      primary={highlightText(primary)}
      secondary={highlightText(secondary)}
    />
  );
};

export default ListItemTextWithHighlightedText;
