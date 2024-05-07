import { Box, Typography, Pagination, Grid } from "@mui/material";
import { MetaData } from "../models/pagination";
import { useCallback, useState } from "react";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = useCallback(
    (page: number) => {
      setPageNumber(page);
      onPageChange(page);
    },
    [onPageChange]
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pt={{ xs: 2, md: 4 }}
      pb={2}
    >
      <Grid display={{ xs: "none", md: "block" }}>
        <Typography>
          Displaying {(currentPage - 1) * pageSize + 1} -{" "}
          {currentPage * pageSize > totalCount
            ? totalCount
            : currentPage * pageSize}{" "}
          of {totalCount} items
        </Typography>
      </Grid>
      <Grid
        container
        display={{ xs: "flex", md: "contents" }}
        p={2}
        justifyContent={{ xs: "center", md: "inherit" }}
      >
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={pageNumber}
          onChange={(_, page) => handlePageChange(page)}
        />
      </Grid>
    </Box>
  );
}
