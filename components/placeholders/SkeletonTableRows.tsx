import { Skeleton, TableCell, TableRow } from "@mui/material";

type Props = {
  rows: number;
  columns: number;
};

const SkeletonTableRows = ({ rows, columns }: Props) => {
  return (
    <>
      {Array(rows)
        .fill(false)
        .map((_, i) => (
          <TableRow key={i}>
            {Array(columns)
              .fill(false)
              .map((_, j) => (
                <TableCell key={j}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
};

export default SkeletonTableRows;
