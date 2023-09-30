import { Box, useMediaQuery } from "@mui/material";
import { EventCard, EventsDataTable, Navbar } from "../common/widgets";
import { Constant } from "../config";
import { useEffect, useState } from "react";
import { EventCRUDType } from "../common/types/eventsCRUDTypes";

export const EventsDataTableList = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        gap="20px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
        padding={"3rem 9%"}
        alignItems="center"
      >
        
        <EventsDataTable></EventsDataTable>
      </Box>
    </Box>
  )
};