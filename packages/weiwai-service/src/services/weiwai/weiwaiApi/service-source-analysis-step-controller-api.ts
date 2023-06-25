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
import { SourceAnalysis2ConfirmPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysis2DetailInfoPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysis2DetailInfopfPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysis2ExcutePostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysis2ProcessStatusPostRequest } from '../weiwaiModel';
// @ts-ignore
import { SourceAnalysis2SearchPostRequest } from '../weiwaiModel';
/**
 * ServiceSourceAnalysisStepControllerApi - axios parameter creator
 * @export
 */
export const ServiceSourceAnalysisStepControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 确认
         * @param {SourceAnalysis2ConfirmPostRequest} [sourceAnalysis2ConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ConfirmPost: async (sourceAnalysis2ConfirmPostRequest?: SourceAnalysis2ConfirmPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/confirm`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2ConfirmPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysis2DetailInfoPostRequest} [sourceAnalysis2DetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2DetailInfoPost: async (sourceAnalysis2DetailInfoPostRequest?: SourceAnalysis2DetailInfoPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/detailInfo`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2DetailInfoPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 单条查询信息
         * @param {SourceAnalysis2DetailInfopfPostRequest} [sourceAnalysis2DetailInfopfPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2DetailInfopfPost: async (sourceAnalysis2DetailInfopfPostRequest?: SourceAnalysis2DetailInfopfPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/detailInfopf`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2DetailInfopfPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 执行
         * @param {SourceAnalysis2ExcutePostRequest} [sourceAnalysis2ExcutePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ExcutePost: async (sourceAnalysis2ExcutePostRequest?: SourceAnalysis2ExcutePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/excute`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2ExcutePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysis2ProcessStatusPostRequest} [sourceAnalysis2ProcessStatusPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ProcessStatusPost: async (sourceAnalysis2ProcessStatusPostRequest?: SourceAnalysis2ProcessStatusPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/processStatus`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2ProcessStatusPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 批处理总览步骤维度-列表查询
         * @param {SourceAnalysis2SearchPostRequest} [sourceAnalysis2SearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2SearchPost: async (sourceAnalysis2SearchPostRequest?: SourceAnalysis2SearchPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourceAnalysis2/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(sourceAnalysis2SearchPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceSourceAnalysisStepControllerApi - functional programming interface
 * @export
 */
export const ServiceSourceAnalysisStepControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceSourceAnalysisStepControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 确认
         * @param {SourceAnalysis2ConfirmPostRequest} [sourceAnalysis2ConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest?: SourceAnalysis2ConfirmPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysis2DetailInfoPostRequest} [sourceAnalysis2DetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest?: SourceAnalysis2DetailInfoPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 单条查询信息
         * @param {SourceAnalysis2DetailInfopfPostRequest} [sourceAnalysis2DetailInfopfPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest?: SourceAnalysis2DetailInfopfPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 执行
         * @param {SourceAnalysis2ExcutePostRequest} [sourceAnalysis2ExcutePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest?: SourceAnalysis2ExcutePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysis2ProcessStatusPostRequest} [sourceAnalysis2ProcessStatusPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest?: SourceAnalysis2ProcessStatusPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 批处理总览步骤维度-列表查询
         * @param {SourceAnalysis2SearchPostRequest} [sourceAnalysis2SearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest?: SourceAnalysis2SearchPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceSourceAnalysisStepControllerApi - factory interface
 * @export
 */
export const ServiceSourceAnalysisStepControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceSourceAnalysisStepControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 确认
         * @param {SourceAnalysis2ConfirmPostRequest} [sourceAnalysis2ConfirmPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest?: SourceAnalysis2ConfirmPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 信息描述
         * @param {SourceAnalysis2DetailInfoPostRequest} [sourceAnalysis2DetailInfoPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest?: SourceAnalysis2DetailInfoPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 单条查询信息
         * @param {SourceAnalysis2DetailInfopfPostRequest} [sourceAnalysis2DetailInfopfPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest?: SourceAnalysis2DetailInfopfPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 执行
         * @param {SourceAnalysis2ExcutePostRequest} [sourceAnalysis2ExcutePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest?: SourceAnalysis2ExcutePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 数据处理状态
         * @param {SourceAnalysis2ProcessStatusPostRequest} [sourceAnalysis2ProcessStatusPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest?: SourceAnalysis2ProcessStatusPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 批处理总览步骤维度-列表查询
         * @param {SourceAnalysis2SearchPostRequest} [sourceAnalysis2SearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest?: SourceAnalysis2SearchPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceSourceAnalysisStepControllerApi - object-oriented interface
 * @export
 * @class ServiceSourceAnalysisStepControllerApi
 * @extends {BaseAPI}
 */
export class ServiceSourceAnalysisStepControllerApi extends BaseAPI {
    /**
     * 
     * @summary 确认
     * @param {SourceAnalysis2ConfirmPostRequest} [sourceAnalysis2ConfirmPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest?: SourceAnalysis2ConfirmPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2ConfirmPost(sourceAnalysis2ConfirmPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 信息描述
     * @param {SourceAnalysis2DetailInfoPostRequest} [sourceAnalysis2DetailInfoPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest?: SourceAnalysis2DetailInfoPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2DetailInfoPost(sourceAnalysis2DetailInfoPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 单条查询信息
     * @param {SourceAnalysis2DetailInfopfPostRequest} [sourceAnalysis2DetailInfopfPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest?: SourceAnalysis2DetailInfopfPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2DetailInfopfPost(sourceAnalysis2DetailInfopfPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 执行
     * @param {SourceAnalysis2ExcutePostRequest} [sourceAnalysis2ExcutePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest?: SourceAnalysis2ExcutePostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2ExcutePost(sourceAnalysis2ExcutePostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 数据处理状态
     * @param {SourceAnalysis2ProcessStatusPostRequest} [sourceAnalysis2ProcessStatusPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest?: SourceAnalysis2ProcessStatusPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2ProcessStatusPost(sourceAnalysis2ProcessStatusPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 批处理总览步骤维度-列表查询
     * @param {SourceAnalysis2SearchPostRequest} [sourceAnalysis2SearchPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceSourceAnalysisStepControllerApi
     */
    public sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest?: SourceAnalysis2SearchPostRequest, options?: AxiosRequestConfig) {
        return ServiceSourceAnalysisStepControllerApiFp(this.configuration).sourceAnalysis2SearchPost(sourceAnalysis2SearchPostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
