import { useEffect, useState } from "react";
import { SmartAgreementAnchoring } from "types/typechain";
import { Event } from "@ethersproject/contracts";

export function useDeclinationEvent(
  documentId: string | null,
  contract: SmartAgreementAnchoring
) {
  const [declinationEvent, setDeclinationEvent] = useState<Event>(null);
  const [declinedAt, setDeclinedAt] = useState<Date>(null);

  useEffect(() => {
    if (!documentId || !contract) return;

    const filter2 = contract.filters.DeclinedByCounterparty(documentId);
    for (let i = 0; i < 100000; i += 5000) {
      contract.queryFilter(filter2, i, i + 5000).then((events) => {
        setDeclinationEvent(events[0] ?? null);
      });
    }
  }, [documentId, contract, setDeclinationEvent]);

  useEffect(() => {
    if (!declinationEvent) return;
    declinationEvent.getBlock().then((block) => {
      setDeclinedAt(new Date(block.timestamp * 1000));
    });
  }, [declinationEvent, setDeclinedAt]);

  return { declinedAt, declinationEvent };
}
