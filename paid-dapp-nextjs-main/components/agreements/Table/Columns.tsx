import AgreementModel from "@/models/agreementModel";
import { ColumnWithLooseAccessor } from "react-table";
import { CounterpartyNameCell } from "./CounterpartyNameCell";
import CreatedAtCell from "./CreatedAtCell";
import { PendingFunctionCell } from "./PendingActionCell";
import { SignedOnCell } from "./SignedOnCell";
import { StatusLabelCell } from "./StatusLabelCell";

export const COLUMNS: ColumnWithLooseAccessor<AgreementModel>[] = [
  {
    Header: "Title",
    id: "title",
    accessor: (model) => model.title,
  },
  {
    Header: "Counterparty",
    id: "counterpartyName",
    accessor: (model) => model.counterPartyName,
    Cell: ({ value }) => <CounterpartyNameCell name={value} />,
  },
  {
    Header: "Created at",
    id: "createdAt",
    accessor: (model) => model,
    Cell: ({ value }) => (
      <CreatedAtCell createdAt={value.createdAt} />
    ),
  },
  {
    Header: "Signed on",
    id: "signedOn",
    accessor: (model) => model,
    Cell: ({ value }) => <SignedOnCell acceptedAt={value.acceptedAt} declinedAt={value.declinedAt} />,
  },
  {
    Header: "Status",
    id: "status",
    accessor: (model) => model.status,
    Cell: ({ value }) => <StatusLabelCell status={value} />,
  },
  {
    Header: "Action Required",
    id: "actionRequired",
    accessor: (model) => model,
    Cell: ({ value }) => (
      <PendingFunctionCell
        status={value.status}
        recipientAddress={value.counterPartyWallet}
      />
    ),
  },
];
