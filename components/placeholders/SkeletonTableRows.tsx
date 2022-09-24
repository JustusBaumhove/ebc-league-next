import { Skeleton, TableCell, TableRow } from "@mui/material";

type Props = {
  rows: number;
  columns: number;
  hideOnSmall: number;
};

const SkeletonTableRows = ({ rows, columns, hideOnSmall }: Props) => {
  return (
    <>
      {Array(rows)
        .fill(false)
        .map((_, i) => (
          <TableRow key={i}>
            {Array(columns - hideOnSmall)
              .fill(false)
              .map((_, j) => (
                <TableCell key={j}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            {Array(hideOnSmall)
              .fill(false)
              .map((_, j) => (
                <TableCell
                  key={j}
                  sx={{ display: { xs: "none", lg: "table-cell" } }}
                >
                  <Skeleton variant="text" />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
};

export default SkeletonTableRows;
