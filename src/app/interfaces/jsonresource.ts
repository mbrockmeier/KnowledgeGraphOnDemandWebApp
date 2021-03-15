import { GroupedPredicate } from './grouped-predicate';

export interface JSONResource {
    incomingArcs: GroupedPredicate[];
    groupedProperties: GroupedPredicate[];
    subject: string;
    extractionTime: number;
    cachedAt: string;
}
