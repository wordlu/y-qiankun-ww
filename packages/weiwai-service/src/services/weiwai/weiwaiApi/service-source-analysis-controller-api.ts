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
import { SourceAnalysis2Excute2PostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysisConfirmPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysisDetailInfoPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysisSearchPostRequest } from '../weiwaiModel';
/**
 * ServiceSourceAnalysisControllerApi - axios parameter creator
 * @export
 */
export const ServiceSourceAnalysisControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 手工执行
         * @param {SourceAnalysis2Excute2PostRequest} [sourceAnalysis2Excute2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2Excute2Post: async (sourceAnalysis2Excute2PostRequest?: SourceAnalysis2Excute2PostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/excute2`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2Excute2PostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 手工确认
         * @param {SourceAnalysisConfirmPostRequest} [sourceAnalysisConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisConfirmPost: async (sourceAnalysisConfirmPostRequest?: SourceAnalysisConfirmPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis/confirm`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysisConfirmPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisDetailInfoPost: async (sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis/detailInfo`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysisDetailInfoPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 执行
         * @param {object} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisExcutePost: async (body?: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis/excute`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisProcessStatusPost: async (sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis/processStatus`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysisDetailInfoPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 批处理总览
         * @param {SourceAnalysisSearchPostRequest} [sourceAnalysisSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisSearchPost: async (sourceAnalysisSearchPostRequest?: SourceAnalysisSearchPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysisSearchPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceSourceAnalysisControllerApi - functional programming interface
 * @export
 */
export const ServiceSourceAnalysisControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceSourceAnalysisControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 手工执行
         * @param {SourceAnalysis2Excute2PostRequest} [sourceAnalysis2Excute2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest?: SourceAnalysis2Excute2PostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 手工确认
         * @param {SourceAnalysisConfirmPostRequest} [sourceAnalysisConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest?: SourceAnalysisConfirmPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 执行
         * @param {object} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysisExcutePost(body?: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysisExcutePost(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 批处理总览
         * @param {SourceAnalysisSearchPostRequest} [sourceAnalysisSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest?: SourceAnalysisSearchPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceSourceAnalysisControllerApi - factory interface
 * @export
 */
export const ServiceSourceAnalysisControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceSourceAnalysisControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 手工执行
         * @param {SourceAnalysis2Excute2PostRequest} [sourceAnalysis2Excute2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest?: SourceAnalysis2Excute2PostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 手工确认
         * @param {SourceAnalysisConfirmPostRequest} [sourceAnalysisConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest?: SourceAnalysisConfirmPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 执行
         * @param {object} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisExcutePost(body?: object, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysisExcutePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 批处理总览
         * @param {SourceAnalysisSearchPostRequest} [sourceAnalysisSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest?: SourceAnalysisSearchPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceSourceAnalysisControllerApi - object-oriented interface
 * @export
 * @class ServiceSourceAnalysisControllerApi
 * @extends {BaseAPI}
 */
export class ServiceSourceAnalysisControllerApi extends BaseAPI {
    /**
     * 
     * @summary 手工执行
     * @param {SourceAnalysis2Excute2PostRequest} [sourceAnalysis2Excute2PostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest?: SourceAnalysis2Excute2PostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysis2Excute2Post(sourceAnalysis2Excute2PostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 手工确认
     * @param {SourceAnalysisConfirmPostRequest} [sourceAnalysisConfirmPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest?: SourceAnalysisConfirmPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysisConfirmPost(sourceAnalysisConfirmPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 信息描述
     * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysisDetailInfoPost(sourceAnalysisDetailInfoPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 执行
     * @param {object} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysisExcutePost(body?: object, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysisExcutePost(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 数据处理状态
     * @param {SourceAnalysisDetailInfoPostRequest} [sourceAnalysisDetailInfoPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest?: SourceAnalysisDetailInfoPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysisProcessStatusPost(sourceAnalysisDetailInfoPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 批处理总览
     * @param {SourceAnalysisSearchPostRequest} [sourceAnalysisSearchPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisControllerApi
     */
    public sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest?: SourceAnalysisSearchPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisControllerApiFp(this.configuration).sourceAnalysisSearchPost(sourceAnalysisSearchPostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
