import AgreementModel from "@/models/agreementModel";
import { Cell } from "react-table";
import styles from "./TableCell.module.scss";

interface TableCellProps {
  cell: Cell<AgreementModel, any>;
  onDetailClick(documentId: string): void;
}

export function TableCell({ cell, onDetailClick }: TableCellProps) {
  function onDoClick() {
    if (cell.column.id === "title") {
      onDetailClick(cell.row.original._id);
    }
  }

  return (
    <td
      {...cell.getCellProps()}
      className={styles[cell.column.id]}
      onClick={onDoClick}
    >
      {cell.render("Cell")}
    </td>
  );
}
