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
import { AssetsAuditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { AssetsBatchAuditPostRequest } from '../weiwaiModel';
// @ts-ignore
import { AssetsExcelPostRequest } from '../weiwaiModel';
// @ts-ignore
import { AssetsSavePostRequestInner } from '../weiwaiModel';
// @ts-ignore
import { AssetsSearchPostRequest } from '../weiwaiModel';
// @ts-ignore
import { AssetsSearchTree2PostRequest } from '../weiwaiModel';
// @ts-ignore
import { MasterDataManagementOrgListViewPostRequest } from '../weiwaiModel';
/**
 * ServiceAssetsControllerApi - axios parameter creator
 * @export
 */
export const ServiceAssetsControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 7.资产科目审核-T
         * @param {AssetsAuditPostRequest} [assetsAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsAuditPost: async (assetsAuditPostRequest?: AssetsAuditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/audit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsAuditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 3.资产科目批量审核-T
         * @param {AssetsBatchAuditPostRequest} [assetsBatchAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsBatchAuditPost: async (assetsBatchAuditPostRequest?: AssetsBatchAuditPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/batchAudit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsBatchAuditPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 2.删除
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsDeletePost: async (masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/delete`;
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
         * @summary 5.资产科目Excel导出-T
         * @param {AssetsExcelPostRequest} [assetsExcelPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsExcelPost: async (assetsExcelPostRequest?: AssetsExcelPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/excel`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsExcelPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 1.机构下拉框-T
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsOrgListGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/orgList`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * @summary 9.资产科目修改(Save)
         * @param {Array<AssetsSavePostRequestInner>} [assetsSavePostRequestInner] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSavePost: async (assetsSavePostRequestInner?: Array<AssetsSavePostRequestInner>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsSavePostRequestInner, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 2.资产科目列表查询-T
         * @param {AssetsSearchPostRequest} [assetsSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSearchPost: async (assetsSearchPostRequest?: AssetsSearchPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsSearchPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 4.标准科目Tree-tree2-T
         * @param {AssetsSearchTree2PostRequest} [assetsSearchTree2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSearchTree2Post: async (assetsSearchTree2PostRequest?: AssetsSearchTree2PostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/assets/searchTree2`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(assetsSearchTree2PostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceAssetsControllerApi - functional programming interface
 * @export
 */
export const ServiceAssetsControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServiceAssetsControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 7.资产科目审核-T
         * @param {AssetsAuditPostRequest} [assetsAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsAuditPost(assetsAuditPostRequest?: AssetsAuditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsAuditPost(assetsAuditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 3.资产科目批量审核-T
         * @param {AssetsBatchAuditPostRequest} [assetsBatchAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsBatchAuditPost(assetsBatchAuditPostRequest?: AssetsBatchAuditPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsBatchAuditPost(assetsBatchAuditPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 2.删除
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsDeletePost(masterDataManagementOrgListViewPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 5.资产科目Excel导出-T
         * @param {AssetsExcelPostRequest} [assetsExcelPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsExcelPost(assetsExcelPostRequest?: AssetsExcelPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsExcelPost(assetsExcelPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 1.机构下拉框-T
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsOrgListGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsOrgListGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 9.资产科目修改(Save)
         * @param {Array<AssetsSavePostRequestInner>} [assetsSavePostRequestInner] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsSavePost(assetsSavePostRequestInner?: Array<AssetsSavePostRequestInner>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsSavePost(assetsSavePostRequestInner, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 2.资产科目列表查询-T
         * @param {AssetsSearchPostRequest} [assetsSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsSearchPost(assetsSearchPostRequest?: AssetsSearchPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsSearchPost(assetsSearchPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 4.标准科目Tree-tree2-T
         * @param {AssetsSearchTree2PostRequest} [assetsSearchTree2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assetsSearchTree2Post(assetsSearchTree2PostRequest?: AssetsSearchTree2PostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.assetsSearchTree2Post(assetsSearchTree2PostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServiceAssetsControllerApi - factory interface
 * @export
 */
export const ServiceAssetsControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServiceAssetsControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary 7.资产科目审核-T
         * @param {AssetsAuditPostRequest} [assetsAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsAuditPost(assetsAuditPostRequest?: AssetsAuditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsAuditPost(assetsAuditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 3.资产科目批量审核-T
         * @param {AssetsBatchAuditPostRequest} [assetsBatchAuditPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsBatchAuditPost(assetsBatchAuditPostRequest?: AssetsBatchAuditPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsBatchAuditPost(assetsBatchAuditPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 2.删除
         * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsDeletePost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 5.资产科目Excel导出-T
         * @param {AssetsExcelPostRequest} [assetsExcelPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsExcelPost(assetsExcelPostRequest?: AssetsExcelPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsExcelPost(assetsExcelPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 1.机构下拉框-T
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsOrgListGet(options?: any): AxiosPromise<object> {
            return localVarFp.assetsOrgListGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 9.资产科目修改(Save)
         * @param {Array<AssetsSavePostRequestInner>} [assetsSavePostRequestInner] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSavePost(assetsSavePostRequestInner?: Array<AssetsSavePostRequestInner>, options?: any): AxiosPromise<object> {
            return localVarFp.assetsSavePost(assetsSavePostRequestInner, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 2.资产科目列表查询-T
         * @param {AssetsSearchPostRequest} [assetsSearchPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSearchPost(assetsSearchPostRequest?: AssetsSearchPostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsSearchPost(assetsSearchPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 4.标准科目Tree-tree2-T
         * @param {AssetsSearchTree2PostRequest} [assetsSearchTree2PostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetsSearchTree2Post(assetsSearchTree2PostRequest?: AssetsSearchTree2PostRequest, options?: any): AxiosPromise<object> {
            return localVarFp.assetsSearchTree2Post(assetsSearchTree2PostRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServiceAssetsControllerApi - object-oriented interface
 * @export
 * @class ServiceAssetsControllerApi
 * @extends {BaseAPI}
 */
export class ServiceAssetsControllerApi extends BaseAPI {
    /**
     * 
     * @summary 7.资产科目审核-T
     * @param {AssetsAuditPostRequest} [assetsAuditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsAuditPost(assetsAuditPostRequest?: AssetsAuditPostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsAuditPost(assetsAuditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 3.资产科目批量审核-T
     * @param {AssetsBatchAuditPostRequest} [assetsBatchAuditPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsBatchAuditPost(assetsBatchAuditPostRequest?: AssetsBatchAuditPostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsBatchAuditPost(assetsBatchAuditPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 2.删除
     * @param {MasterDataManagementOrgListViewPostRequest} [masterDataManagementOrgListViewPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsDeletePost(masterDataManagementOrgListViewPostRequest?: MasterDataManagementOrgListViewPostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsDeletePost(masterDataManagementOrgListViewPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 5.资产科目Excel导出-T
     * @param {AssetsExcelPostRequest} [assetsExcelPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsExcelPost(assetsExcelPostRequest?: AssetsExcelPostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsExcelPost(assetsExcelPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 1.机构下拉框-T
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsOrgListGet(options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsOrgListGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 9.资产科目修改(Save)
     * @param {Array<AssetsSavePostRequestInner>} [assetsSavePostRequestInner] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsSavePost(assetsSavePostRequestInner?: Array<AssetsSavePostRequestInner>, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsSavePost(assetsSavePostRequestInner, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 2.资产科目列表查询-T
     * @param {AssetsSearchPostRequest} [assetsSearchPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsSearchPost(assetsSearchPostRequest?: AssetsSearchPostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsSearchPost(assetsSearchPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 4.标准科目Tree-tree2-T
     * @param {AssetsSearchTree2PostRequest} [assetsSearchTree2PostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceAssetsControllerApi
     */
    public assetsSearchTree2Post(assetsSearchTree2PostRequest?: AssetsSearchTree2PostRequest, options?: AxiosRequestConfig) {
        return ServiceAssetsControllerApiFp(this.configuration).assetsSearchTree2Post(assetsSearchTree2PostRequest, options).then((request) => request(this.axios, this.basePath));
    }
}