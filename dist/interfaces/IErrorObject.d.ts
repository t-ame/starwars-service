declare type errorData = string | object;
export interface IErrorObject extends Error {
    code?: string;
    data?: errorData;
}
export {};
//# sourceMappingURL=IErrorObject.d.ts.map