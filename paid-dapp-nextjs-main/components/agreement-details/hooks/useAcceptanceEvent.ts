import { useEffect, useState } from "react";
import { SmartAgreementAnchoring } from "types/typechain";
import { Event } from "@ethersproject/contracts";

export function useAcceptanceEvent(
  documentId: string | null,
  contract: SmartAgreementAnchoring
) {
  const [acceptanceEvent, setAcceptanceEvent] = useState<Event>(null);
  const [acceptedAt, setAcceptedAt] = useState<Date>(null);

  useEffect(() => {
    if (!documentId || !contract) return;

    const filter1 = contract.filters.AcceptedByCounterparty(documentId);

    /**
     * Need to see if there is a better way to loop through blocks greater than 5000
     */
    for (let i = 0; i < 100000; i += 5000) {
      contract.queryFilter(filter1, i, i + 5000).then((events) => {
        setAcceptanceEvent(events[0] ?? null);
      });
    }
  }, [documentId, contract, setAcceptanceEvent]);

  useEffect(() => {
    if (!acceptanceEvent) return;
    acceptanceEvent.getBlock().then((block) => {
      setAcceptedAt(new Date(block.timestamp * 1000));
    });
  }, [acceptanceEvent, setAcceptedAt]);

  return { acceptedAt, acceptanceEvent };
}
