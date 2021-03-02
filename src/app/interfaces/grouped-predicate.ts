import { RDFObject } from './rdfobject';

export interface GroupedPredicate {
    predicate: string;
    objects: RDFObject[];
}
