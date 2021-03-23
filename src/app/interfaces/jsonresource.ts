import { GroupedPredicate } from './grouped-predicate';

export interface JSONResource {
    incomingArcs: GroupedPredicate[];
    groupedProperties: GroupedPredicate[];
    subject: string;
<<<<<<< HEAD
    extractionTime: number;
    cachedAt: string;
=======
    extract: string;
    rdfXML: string;
>>>>>>> origin/KGOD-28
}
