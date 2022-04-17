import { useEffect, useState } from "react";
import { SmartAgreementAnchoring } from "types/typechain";
import { Event } from "@ethersproject/contracts";
import { DocumentAnchor } from "../DocumentAnchor";

export function useCreationEvent(
  document: DocumentAnchor,
  contract: SmartAgreementAnchoring
) {
  const [createdAt, setCreatedAt] = useState<Date>(null);
  const [creationEvent, setCreationEvent] = useState<Event>(null);

  useEffect(() => {
    if (!contract || !document) return;

    const filter3 = contract.filters.DocumentAnchored(document.proposer);
    for (let i = 0; i < 100000; i += 5000) {
      contract.queryFilter(filter3, i , i + 5000).then((events) => {
        const documentId = document.fileHash;
        const event = events.find((item) => item.args.documentId === documentId);
        setCreationEvent(event ?? null);
      });
    }
  }, [contract, document, setCreationEvent]);

  useEffect(() => {
    if (!creationEvent) return;
    creationEvent.getBlock().then((block) => {
      setCreatedAt(new Date(block.timestamp * 1000));
    });
  }, [creationEvent, setCreatedAt]);

  return { createdAt, creationEvent };
}
