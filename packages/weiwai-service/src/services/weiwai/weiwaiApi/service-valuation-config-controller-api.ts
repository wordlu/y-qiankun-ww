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
import { OrgIndexStatePostRequest } from '../weiwaiModel';
// @ts-ignore
import { ValuationConfigAddPostRequest } from '../weiwaiModel';
// @ts-ignore
import { ValuationConfigAllByIdPostRequest } from '../weiwaiModel';
// @ts-ignore
import { ValuationConfigAllPostRequest } from '../weiwaiModel';
// @ts-ignore
import { ValuationConfigEditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { ValuationConfigExistPostRequest } from '../weiwaiModel';
/**
 * ServiceValuationConfigControllerApi - axios parameter creator
 * @export
 */
export const ServiceValuationConfigControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增
         * @param {ValuationConfigAddPostRequest} [valuationConfigAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAddPost: async (valuationConfigAddPostRequest?: ValuationConfigAddPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/add`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(valuationConfigAddPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 查看此分类
         * @param {ValuationConfigAllByIdPostRequest} [valuationConfigAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAllByIdPost: async (valuationConfigAllByIdPostRequest?: ValuationConfigAllByIdPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/allById`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(valuationConfigAllByIdPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 估值列表映射_列表查询
         * @param {ValuationConfigAllPostRequest} [valuationConfigAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAllPost: async (valuationConfigAllPostRequest?: ValuationConfigAllPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/all`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(valuationConfigAllPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 编辑
         * @param {ValuationConfigEditPostRequest} [valuationConfigEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigEditPost: async (valuationConfigEditPostRequest?: ValuationConfigEditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/edit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(valuationConfigEditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {ValuationConfigExistPostRequest} [valuationConfigExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigExistPost: async (valuationConfigExistPostRequest?: ValuationConfigExistPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/exist`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(valuationConfigExistPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 文件标记
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigFileTagPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/fileTag`;
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
         * @summary 机构代码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigOrgListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/orgList`;
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
         * @summary 启用、禁用
         * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigStatePost: async (orgIndexStatePostRequest?: OrgIndexStatePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/valuationConfig/state`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexStatePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceValuationConfigControllerApi - functional programming interface
 * @export
 */
export const ServiceValuationConfigControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceValuationConfigControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {ValuationConfigAddPostRequest} [valuationConfigAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigAddPost(valuationConfigAddPostRequest?: ValuationConfigAddPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigAddPost(valuationConfigAddPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 查看此分类
         * @param {ValuationConfigAllByIdPostRequest} [valuationConfigAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest?: ValuationConfigAllByIdPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 估值列表映射_列表查询
         * @param {ValuationConfigAllPostRequest} [valuationConfigAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigAllPost(valuationConfigAllPostRequest?: ValuationConfigAllPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigAllPost(valuationConfigAllPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 编辑
         * @param {ValuationConfigEditPostRequest} [valuationConfigEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigEditPost(valuationConfigEditPostRequest?: ValuationConfigEditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigEditPost(valuationConfigEditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {ValuationConfigExistPostRequest} [valuationConfigExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigExistPost(valuationConfigExistPostRequest?: ValuationConfigExistPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigExistPost(valuationConfigExistPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 文件标记
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigFileTagPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigFileTagPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 机构代码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigOrgListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigOrgListPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 启用、禁用
         * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async valuationConfigStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.valuationConfigStatePost(orgIndexStatePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceValuationConfigControllerApi - factory interface
 * @export
 */
export const ServiceValuationConfigControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceValuationConfigControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {ValuationConfigAddPostRequest} [valuationConfigAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAddPost(valuationConfigAddPostRequest?: ValuationConfigAddPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigAddPost(valuationConfigAddPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 查看此分类
         * @param {ValuationConfigAllByIdPostRequest} [valuationConfigAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest?: ValuationConfigAllByIdPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 估值列表映射_列表查询
         * @param {ValuationConfigAllPostRequest} [valuationConfigAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigAllPost(valuationConfigAllPostRequest?: ValuationConfigAllPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigAllPost(valuationConfigAllPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 编辑
         * @param {ValuationConfigEditPostRequest} [valuationConfigEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigEditPost(valuationConfigEditPostRequest?: ValuationConfigEditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigEditPost(valuationConfigEditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {ValuationConfigExistPostRequest} [valuationConfigExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigExistPost(valuationConfigExistPostRequest?: ValuationConfigExistPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigExistPost(valuationConfigExistPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 文件标记
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigFileTagPost(options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigFileTagPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 机构代码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigOrgListPost(options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigOrgListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 启用、禁用
         * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        valuationConfigStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.valuationConfigStatePost(orgIndexStatePostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceValuationConfigControllerApi - object-oriented interface
 * @export
 * @class ServiceValuationConfigControllerApi
 * @extends {BaseAPI}
 */
export class ServiceValuationConfigControllerApi extends BaseAPI {
    /**
     * 
     * @summary 新增
     * @param {ValuationConfigAddPostRequest} [valuationConfigAddPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigAddPost(valuationConfigAddPostRequest?: ValuationConfigAddPostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigAddPost(valuationConfigAddPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 查看此分类
     * @param {ValuationConfigAllByIdPostRequest} [valuationConfigAllByIdPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest?: ValuationConfigAllByIdPostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigAllByIdPost(valuationConfigAllByIdPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 估值列表映射_列表查询
     * @param {ValuationConfigAllPostRequest} [valuationConfigAllPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigAllPost(valuationConfigAllPostRequest?: ValuationConfigAllPostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigAllPost(valuationConfigAllPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 编辑
     * @param {ValuationConfigEditPostRequest} [valuationConfigEditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigEditPost(valuationConfigEditPostRequest?: ValuationConfigEditPostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigEditPost(valuationConfigEditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 检验是否重复
     * @param {ValuationConfigExistPostRequest} [valuationConfigExistPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigExistPost(valuationConfigExistPostRequest?: ValuationConfigExistPostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigExistPost(valuationConfigExistPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 文件标记
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigFileTagPost(options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigFileTagPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 机构代码
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigOrgListPost(options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigOrgListPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 启用、禁用
     * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceValuationConfigControllerApi
     */
    public valuationConfigStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: AxiosRequestConfig) {
        return ServiceValuationConfigControllerApiFp(this.configuration).valuationConfigStatePost(orgIndexStatePostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
