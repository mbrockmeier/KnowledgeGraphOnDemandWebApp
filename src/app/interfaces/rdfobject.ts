export interface RDFObject {
    type: string;
    prefixedUri: string;
    uri: string;
    datatype: string;
    language: string;
    datatypeUri: string;
    value: string;
}
