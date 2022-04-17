import AgreementModel from "@/models/agreementModel";
import { useSelector } from "react-redux";
import { useSortBy, useTable } from "react-table";
import { COLUMNS } from "./Columns";
import styles from "./Table.module.scss";
import { TableCell } from "./TableCell";

interface TableProps {
  data: AgreementModel[];
  onDetailClick: (id: string) => void;
}

export function Table({ data, onDetailClick }: TableProps) {
  const currentWallet = useSelector(
    (state: { walletReducer: any }) => state.walletReducer.currentWallet
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<AgreementModel>(
      {
        columns: COLUMNS,
        data,
      },
      useSortBy,
    );

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column) => (
              <th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {data.length > 0 && (
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} key={row.original.cid}>
                {row.cells.map((cell) => {
                  // Each cell is unique for each row and each column. Without this
                  // unique Key, React might recycle a cell in an incorrect row
                  // while rerendering, returning incorrect data.
                  const key = `${cell.row.original.cid}-${cell.column.id}`;
                  return (
                    <TableCell
                      cell={cell}
                      key={key}
                      onDetailClick={onDetailClick}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
}
