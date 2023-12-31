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
import { InvestMgrGetInvestMgrListPostRequest } from '../weiwaiModel';
// @ts-ignore
import { InvestMgrInvestMgrSavePostRequest } from '../weiwaiModel';
/**
 * ServiceInvestMgrControllerApi - axios parameter creator
 * @export
 */
export const ServiceInvestMgrControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/getInvestMgrList
         * @param {InvestMgrGetInvestMgrListPostRequest} [investMgrGetInvestMgrListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        investMgrGetInvestMgrListPost: async (investMgrGetInvestMgrListPostRequest?: InvestMgrGetInvestMgrListPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/investMgr/getInvestMgrList`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(investMgrGetInvestMgrListPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/investMgrSave
         * @param {InvestMgrInvestMgrSavePostRequest} [investMgrInvestMgrSavePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        investMgrInvestMgrSavePost: async (investMgrInvestMgrSavePostRequest?: InvestMgrInvestMgrSavePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/investMgr/investMgrSave`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(investMgrInvestMgrSavePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceInvestMgrControllerApi - functional programming interface
 * @export
 */
export const ServiceInvestMgrControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceInvestMgrControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/getInvestMgrList
         * @param {InvestMgrGetInvestMgrListPostRequest} [investMgrGetInvestMgrListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest?: InvestMgrGetInvestMgrListPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/investMgrSave
         * @param {InvestMgrInvestMgrSavePostRequest} [investMgrInvestMgrSavePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest?: InvestMgrInvestMgrSavePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceInvestMgrControllerApi - factory interface
 * @export
 */
export const ServiceInvestMgrControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceInvestMgrControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/getInvestMgrList
         * @param {InvestMgrGetInvestMgrListPostRequest} [investMgrGetInvestMgrListPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest?: InvestMgrGetInvestMgrListPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary http://127.0.0.1:8080/investMgr/investMgrSave
         * @param {InvestMgrInvestMgrSavePostRequest} [investMgrInvestMgrSavePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest?: InvestMgrInvestMgrSavePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceInvestMgrControllerApi - object-oriented interface
 * @export
 * @class ServiceInvestMgrControllerApi
 * @extends {BaseAPI}
 */
export class ServiceInvestMgrControllerApi extends BaseAPI {
    /**
     * 
     * @summary http://127.0.0.1:8080/investMgr/getInvestMgrList
     * @param {InvestMgrGetInvestMgrListPostRequest} [investMgrGetInvestMgrListPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceInvestMgrControllerApi
     */
    public investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest?: InvestMgrGetInvestMgrListPostRequest, options?: AxiosRequestConfig) {
        return ServiceInvestMgrControllerApiFp(this.configuration).investMgrGetInvestMgrListPost(investMgrGetInvestMgrListPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary http://127.0.0.1:8080/investMgr/investMgrSave
     * @param {InvestMgrInvestMgrSavePostRequest} [investMgrInvestMgrSavePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceInvestMgrControllerApi
     */
    public investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest?: InvestMgrInvestMgrSavePostRequest, options?: AxiosRequestConfig) {
        return ServiceInvestMgrControllerApiFp(this.configuration).investMgrInvestMgrSavePost(investMgrInvestMgrSavePostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
