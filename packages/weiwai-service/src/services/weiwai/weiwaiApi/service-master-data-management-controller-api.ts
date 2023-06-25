/* tslint:disable */
/* eslint-disable */
/**
 * 委外
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { MasterDataManagementCheckStatePostRequest } from '../weiwaiModel';
// @ts-ignore
import { MasterDataManagementEditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { MasterDataManagementGetOrgListPostRequest } from '../weiwaiModel';
// @ts-ignore
import { MasterDataManagementOrgListViewPostRequest } from '../weiwaiModel';
/**
 * ServiceMasterDataManagementControllerApi - axios parameter creator
 * @export
 */
export const ServiceMasterDataManagementControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/add
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementAddPost: async (body?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/add`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'text/plain';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/checkState
         * @param {MasterDataManagementCheckStatePostRequest} [masterDataManagementCheckStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementCheckStatePost: async (masterDataManagementCheckStatePostRequest?: MasterDataManagementCheckStatePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/checkState`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterDataManagementCheckStatePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/delete
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementDeletePost: async (masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/delete`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterDataManagementOrgListViewPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/edit
         * @param {MasterDataManagementEditPostRequest} [masterDataManagementEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementEditPost: async (masterDataManagementEditPostRequest?: MasterDataManagementEditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/edit`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterDataManagementEditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/getOrgList
         * @param {MasterDataManagementGetOrgListPostRequest} [masterDataManagementGetOrgListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementGetOrgListPost: async (masterDataManagementGetOrgListPostRequest?: MasterDataManagementGetOrgListPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/getOrgList`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterDataManagementGetOrgListPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/orgListView
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementOrgListViewPost: async (masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/orgListView`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterDataManagementOrgListViewPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/queryOrg
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementQueryOrgPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/masterDataManagement/queryOrg`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceMasterDataManagementControllerApi - functional programming interface
 * @export
 */
export const ServiceMasterDataManagementControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceMasterDataManagementControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/add
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementAddPost(body?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementAddPost(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/checkState
         * @param {MasterDataManagementCheckStatePostRequest} [masterDataManagementCheckStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest?: MasterDataManagementCheckStatePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/delete
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/edit
         * @param {MasterDataManagementEditPostRequest} [masterDataManagementEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementEditPost(masterDataManagementEditPostRequest?: MasterDataManagementEditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementEditPost(masterDataManagementEditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/getOrgList
         * @param {MasterDataManagementGetOrgListPostRequest} [masterDataManagementGetOrgListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest?: MasterDataManagementGetOrgListPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/orgListView
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/queryOrg
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async masterDataManagementQueryOrgPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.masterDataManagementQueryOrgPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceMasterDataManagementControllerApi - factory interface
 * @export
 */
export const ServiceMasterDataManagementControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceMasterDataManagementControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/add
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementAddPost(body?: string, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/checkState
         * @param {MasterDataManagementCheckStatePostRequest} [masterDataManagementCheckStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest?: MasterDataManagementCheckStatePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/delete
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/edit
         * @param {MasterDataManagementEditPostRequest} [masterDataManagementEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementEditPost(masterDataManagementEditPostRequest?: MasterDataManagementEditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementEditPost(masterDataManagementEditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/getOrgList
         * @param {MasterDataManagementGetOrgListPostRequest} [masterDataManagementGetOrgListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest?: MasterDataManagementGetOrgListPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/orgListView
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/masterDataManagement/queryOrg
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        masterDataManagementQueryOrgPost(options?: any): AxiosPromise<object> {
            return localVarFp.masterDataManagementQueryOrgPost(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceMasterDataManagementControllerApi - object-oriented interface
 * @export
 * @class ServiceMasterDataManagementControllerApi
 * @extends {BaseAPI}
 */
export class ServiceMasterDataManagementControllerApi extends BaseAPI {
    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/add
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementAddPost(body?: string, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/checkState
     * @param {MasterDataManagementCheckStatePostRequest} [masterDataManagementCheckStatePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest?: MasterDataManagementCheckStatePostRequest, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementCheckStatePost(masterDataManagementCheckStatePostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/delete
     * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementDeletePost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/edit
     * @param {MasterDataManagementEditPostRequest} [masterDataManagementEditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementEditPost(masterDataManagementEditPostRequest?: MasterDataManagementEditPostRequest, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementEditPost(masterDataManagementEditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/getOrgList
     * @param {MasterDataManagementGetOrgListPostRequest} [masterDataManagementGetOrgListPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest?: MasterDataManagementGetOrgListPostRequest, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementGetOrgListPost(masterDataManagementGetOrgListPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/orgListView
     * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementOrgListViewPost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/masterDataManagement/queryOrg
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceMasterDataManagementControllerApi
     */
    public masterDataManagementQueryOrgPost(options?: AxiosRequestConfig) {
        return ServiceMasterDataManagementControllerApiFp(this.configuration).masterDataManagementQueryOrgPost(options).then((request) => request(this.axios, this.basePath));
    }
}
