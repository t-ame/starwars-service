export declare const HttpRequestHandler: {
    /**
     * Make a GET request to an endpoint
     *
     * @returns Promise<any>
     */
    makeGetCall(endpoint: string, parameters?: any): Promise<any>;
    /**
     * Make a POST request to an endpoint
     *
     * @returns Promise<any>
     */
    makePostCall(endpoint: string, data: {
        [x: string]: any;
    }): Promise<any>;
};
//# sourceMappingURL=HttpRequestHandler.d.ts.map