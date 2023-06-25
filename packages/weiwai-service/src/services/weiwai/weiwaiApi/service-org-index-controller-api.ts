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
import { OrgIndexAddPostRequest } from '../weiwaiModel';
// @ts-ignore
import { OrgIndexAllByIdPostRequest } from '../weiwaiModel';
// @ts-ignore
import { OrgIndexAllPostRequest } from '../weiwaiModel';
// @ts-ignore
import { OrgIndexEditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { OrgIndexExistPostRequest } from '../weiwaiModel';
// @ts-ignore
import { OrgIndexStatePostRequest } from '../weiwaiModel';
/**
 * ServiceOrgIndexControllerApi - axios parameter creator
 * @export
 */
export const ServiceOrgIndexControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增
         * @param {OrgIndexAddPostRequest} [orgIndexAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAddPost: async (orgIndexAddPostRequest?: OrgIndexAddPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/add`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexAddPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 查看此分类
         * @param {OrgIndexAllByIdPostRequest} [orgIndexAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAllByIdPost: async (orgIndexAllByIdPostRequest?: OrgIndexAllByIdPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/allById`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexAllByIdPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 机构指标映射-列表查询
         * @param {OrgIndexAllPostRequest} [orgIndexAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAllPost: async (orgIndexAllPostRequest?: OrgIndexAllPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/all`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexAllPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 编辑
         * @param {OrgIndexEditPostRequest} [orgIndexEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexEditPost: async (orgIndexEditPostRequest?: OrgIndexEditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/edit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexEditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {OrgIndexExistPostRequest} [orgIndexExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexExistPost: async (orgIndexExistPostRequest?: OrgIndexExistPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/exist`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(orgIndexExistPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 源指标
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexIndexCodePost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/indexCode`;
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
         * @summary 机构下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexOrgListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/orgList`;
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
        orgIndexStatePost: async (orgIndexStatePostRequest?: OrgIndexStatePostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/orgIndex/state`;
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
 * ServiceOrgIndexControllerApi - functional programming interface
 * @export
 */
export const ServiceOrgIndexControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceOrgIndexControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {OrgIndexAddPostRequest} [orgIndexAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexAddPost(orgIndexAddPostRequest?: OrgIndexAddPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexAddPost(orgIndexAddPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 查看此分类
         * @param {OrgIndexAllByIdPostRequest} [orgIndexAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexAllByIdPost(orgIndexAllByIdPostRequest?: OrgIndexAllByIdPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexAllByIdPost(orgIndexAllByIdPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 机构指标映射-列表查询
         * @param {OrgIndexAllPostRequest} [orgIndexAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexAllPost(orgIndexAllPostRequest?: OrgIndexAllPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexAllPost(orgIndexAllPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 编辑
         * @param {OrgIndexEditPostRequest} [orgIndexEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexEditPost(orgIndexEditPostRequest?: OrgIndexEditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexEditPost(orgIndexEditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {OrgIndexExistPostRequest} [orgIndexExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexExistPost(orgIndexExistPostRequest?: OrgIndexExistPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexExistPost(orgIndexExistPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 源指标
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexIndexCodePost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexIndexCodePost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 机构下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexOrgListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexOrgListPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 启用、禁用
         * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orgIndexStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orgIndexStatePost(orgIndexStatePostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceOrgIndexControllerApi - factory interface
 * @export
 */
export const ServiceOrgIndexControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceOrgIndexControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 新增
         * @param {OrgIndexAddPostRequest} [orgIndexAddPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAddPost(orgIndexAddPostRequest?: OrgIndexAddPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexAddPost(orgIndexAddPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 查看此分类
         * @param {OrgIndexAllByIdPostRequest} [orgIndexAllByIdPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAllByIdPost(orgIndexAllByIdPostRequest?: OrgIndexAllByIdPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexAllByIdPost(orgIndexAllByIdPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 机构指标映射-列表查询
         * @param {OrgIndexAllPostRequest} [orgIndexAllPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexAllPost(orgIndexAllPostRequest?: OrgIndexAllPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexAllPost(orgIndexAllPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 编辑
         * @param {OrgIndexEditPostRequest} [orgIndexEditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexEditPost(orgIndexEditPostRequest?: OrgIndexEditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexEditPost(orgIndexEditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 检验是否重复
         * @param {OrgIndexExistPostRequest} [orgIndexExistPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexExistPost(orgIndexExistPostRequest?: OrgIndexExistPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexExistPost(orgIndexExistPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 源指标
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexIndexCodePost(options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexIndexCodePost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 机构下拉
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexOrgListPost(options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexOrgListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 启用、禁用
         * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orgIndexStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.orgIndexStatePost(orgIndexStatePostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceOrgIndexControllerApi - object-oriented interface
 * @export
 * @class ServiceOrgIndexControllerApi
 * @extends {BaseAPI}
 */
export class ServiceOrgIndexControllerApi extends BaseAPI {
    /**
     * 
     * @summary 新增
     * @param {OrgIndexAddPostRequest} [orgIndexAddPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexAddPost(orgIndexAddPostRequest?: OrgIndexAddPostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexAddPost(orgIndexAddPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 查看此分类
     * @param {OrgIndexAllByIdPostRequest} [orgIndexAllByIdPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexAllByIdPost(orgIndexAllByIdPostRequest?: OrgIndexAllByIdPostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexAllByIdPost(orgIndexAllByIdPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 机构指标映射-列表查询
     * @param {OrgIndexAllPostRequest} [orgIndexAllPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexAllPost(orgIndexAllPostRequest?: OrgIndexAllPostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexAllPost(orgIndexAllPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 编辑
     * @param {OrgIndexEditPostRequest} [orgIndexEditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexEditPost(orgIndexEditPostRequest?: OrgIndexEditPostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexEditPost(orgIndexEditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 检验是否重复
     * @param {OrgIndexExistPostRequest} [orgIndexExistPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexExistPost(orgIndexExistPostRequest?: OrgIndexExistPostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexExistPost(orgIndexExistPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 源指标
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexIndexCodePost(options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexIndexCodePost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 机构下拉
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexOrgListPost(options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexOrgListPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 启用、禁用
     * @param {OrgIndexStatePostRequest} [orgIndexStatePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceOrgIndexControllerApi
     */
    public orgIndexStatePost(orgIndexStatePostRequest?: OrgIndexStatePostRequest, options?: AxiosRequestConfig) {
        return ServiceOrgIndexControllerApiFp(this.configuration).orgIndexStatePost(orgIndexStatePostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}