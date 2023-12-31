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
import { DataAgingAddPostRequest } from '../weiwaiModel';
// @ts-ignore
import { DataAgingBatchApprovePostRequest } from '../weiwaiModel';
// @ts-ignore
import { DataAgingCheckPostRequest } from '../weiwaiModel';
// @ts-ignore
import { DataAgingEditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { DataAgingIsExistPostRequest } from '../weiwaiModel';
// @ts-ignore
import { DataAgingQueryPostRequest } from '../weiwaiModel';
// @ts-ignore
import { MailRulesDeletePostRequest } from '../weiwaiModel';
/**
 * ServiceDataSrcAgingControllerApi - axios parameter creator
 * @export
 */
export const ServiceDataSrcAgingControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增
         * @param {DataAgingAddPostRequest} [dataAgingAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingAddPost: async (dataAgingAddPostRequest?: DataAgingAddPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/add`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingAddPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 批量审核
         * @param {DataAgingBatchApprovePostRequest} [dataAgingBatchApprovePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingBatchApprovePost: async (dataAgingBatchApprovePostRequest?: DataAgingBatchApprovePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/batchApprove`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingBatchApprovePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 审核
         * @param {DataAgingCheckPostRequest} [dataAgingCheckPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingCheckPost: async (dataAgingCheckPostRequest?: DataAgingCheckPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/check`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingCheckPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 删除
         * @param {MailRulesDeletePostRequest} [mailRulesDeletePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingDeletePost: async (mailRulesDeletePostRequest?: MailRulesDeletePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/delete`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(mailRulesDeletePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 编辑
         * @param {DataAgingEditPostRequest} [dataAgingEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingEditPost: async (dataAgingEditPostRequest?: DataAgingEditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/edit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingEditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 策略专户下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingGetCombinListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/getCombinList`;
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
        /**
         * 
         * @summary 获取估值日期
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingGetListByAgingPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/getListByAging`;
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
        /**
         * 
         * @summary 校验
         * @param {DataAgingIsExistPostRequest} [dataAgingIsExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingIsExistPost: async (dataAgingIsExistPostRequest?: DataAgingIsExistPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/isExist`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingIsExistPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 时效管理_列表查询
         * @param {DataAgingQueryPostRequest} [dataAgingQueryPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingQueryPost: async (dataAgingQueryPostRequest?: DataAgingQueryPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/dataAging/query`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(dataAgingQueryPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceDataSrcAgingControllerApi - functional programming interface
 * @export
 */
export const ServiceDataSrcAgingControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceDataSrcAgingControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {DataAgingAddPostRequest} [dataAgingAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingAddPost(dataAgingAddPostRequest?: DataAgingAddPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingAddPost(dataAgingAddPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 批量审核
         * @param {DataAgingBatchApprovePostRequest} [dataAgingBatchApprovePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest?: DataAgingBatchApprovePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 审核
         * @param {DataAgingCheckPostRequest} [dataAgingCheckPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingCheckPost(dataAgingCheckPostRequest?: DataAgingCheckPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingCheckPost(dataAgingCheckPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 删除
         * @param {MailRulesDeletePostRequest} [mailRulesDeletePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingDeletePost(mailRulesDeletePostRequest?: MailRulesDeletePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingDeletePost(mailRulesDeletePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 编辑
         * @param {DataAgingEditPostRequest} [dataAgingEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingEditPost(dataAgingEditPostRequest?: DataAgingEditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingEditPost(dataAgingEditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 策略专户下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingGetCombinListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingGetCombinListPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 获取估值日期
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingGetListByAgingPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingGetListByAgingPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 校验
         * @param {DataAgingIsExistPostRequest} [dataAgingIsExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingIsExistPost(dataAgingIsExistPostRequest?: DataAgingIsExistPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingIsExistPost(dataAgingIsExistPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 时效管理_列表查询
         * @param {DataAgingQueryPostRequest} [dataAgingQueryPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataAgingQueryPost(dataAgingQueryPostRequest?: DataAgingQueryPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataAgingQueryPost(dataAgingQueryPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceDataSrcAgingControllerApi - factory interface
 * @export
 */
export const ServiceDataSrcAgingControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceDataSrcAgingControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {DataAgingAddPostRequest} [dataAgingAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingAddPost(dataAgingAddPostRequest?: DataAgingAddPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingAddPost(dataAgingAddPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 批量审核
         * @param {DataAgingBatchApprovePostRequest} [dataAgingBatchApprovePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest?: DataAgingBatchApprovePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 审核
         * @param {DataAgingCheckPostRequest} [dataAgingCheckPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingCheckPost(dataAgingCheckPostRequest?: DataAgingCheckPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingCheckPost(dataAgingCheckPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除
         * @param {MailRulesDeletePostRequest} [mailRulesDeletePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingDeletePost(mailRulesDeletePostRequest?: MailRulesDeletePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingDeletePost(mailRulesDeletePostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 编辑
         * @param {DataAgingEditPostRequest} [dataAgingEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingEditPost(dataAgingEditPostRequest?: DataAgingEditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingEditPost(dataAgingEditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 策略专户下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingGetCombinListPost(options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingGetCombinListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取估值日期
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingGetListByAgingPost(options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingGetListByAgingPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 校验
         * @param {DataAgingIsExistPostRequest} [dataAgingIsExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingIsExistPost(dataAgingIsExistPostRequest?: DataAgingIsExistPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingIsExistPost(dataAgingIsExistPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 时效管理_列表查询
         * @param {DataAgingQueryPostRequest} [dataAgingQueryPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataAgingQueryPost(dataAgingQueryPostRequest?: DataAgingQueryPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.dataAgingQueryPost(dataAgingQueryPostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceDataSrcAgingControllerApi - object-oriented interface
 * @export
 * @class ServiceDataSrcAgingControllerApi
 * @extends {BaseAPI}
 */
export class ServiceDataSrcAgingControllerApi extends BaseAPI {
    /**
     * 
     * @summary 新增
     * @param {DataAgingAddPostRequest} [dataAgingAddPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingAddPost(dataAgingAddPostRequest?: DataAgingAddPostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingAddPost(dataAgingAddPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 批量审核
     * @param {DataAgingBatchApprovePostRequest} [dataAgingBatchApprovePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest?: DataAgingBatchApprovePostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingBatchApprovePost(dataAgingBatchApprovePostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 审核
     * @param {DataAgingCheckPostRequest} [dataAgingCheckPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingCheckPost(dataAgingCheckPostRequest?: DataAgingCheckPostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingCheckPost(dataAgingCheckPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 删除
     * @param {MailRulesDeletePostRequest} [mailRulesDeletePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingDeletePost(mailRulesDeletePostRequest?: MailRulesDeletePostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingDeletePost(mailRulesDeletePostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 编辑
     * @param {DataAgingEditPostRequest} [dataAgingEditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingEditPost(dataAgingEditPostRequest?: DataAgingEditPostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingEditPost(dataAgingEditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 策略专户下拉
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingGetCombinListPost(options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingGetCombinListPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 获取估值日期
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingGetListByAgingPost(options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingGetListByAgingPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 校验
     * @param {DataAgingIsExistPostRequest} [dataAgingIsExistPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingIsExistPost(dataAgingIsExistPostRequest?: DataAgingIsExistPostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingIsExistPost(dataAgingIsExistPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 时效管理_列表查询
     * @param {DataAgingQueryPostRequest} [dataAgingQueryPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceDataSrcAgingControllerApi
     */
    public dataAgingQueryPost(dataAgingQueryPostRequest?: DataAgingQueryPostRequest, options?: AxiosRequestConfig) {
        return ServiceDataSrcAgingControllerApiFp(this.configuration).dataAgingQueryPost(dataAgingQueryPostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
