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



/**
 * 
 * @export
 * @interface ValDataLockGetVlaListPostRequest
 */
export interface ValDataLockGetVlaListPostRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof ValDataLockGetVlaListPostRequest
     */
    'customerCode': Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ValDataLockGetVlaListPostRequest
     */
    'vlaDate': string;
    /**
     * 
     * @type {string}
     * @memberof ValDataLockGetVlaListPostRequest
     */
    'taskDate': string;
    /**
     * 
     * @type {number}
     * @memberof ValDataLockGetVlaListPostRequest
     */
    'startPage': number;
    /**
     * 
     * @type {number}
     * @memberof ValDataLockGetVlaListPostRequest
     */
    'pageSize': number;
}
