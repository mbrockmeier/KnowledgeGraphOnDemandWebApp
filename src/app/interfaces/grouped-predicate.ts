import { RDFObject } from './rdfobject';

export interface GroupedPredicate {
    predicate: string;
    prefixedPredicate: string;
    objects: RDFObject[];
}
