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


// May contain unused imports in some cases
// @ts-ignore
import { UserAuthorityInfoSavePostRequestDataInner } from './user-authority-info-save-post-request-data-inner';

/**
 * 
 * @export
 * @interface UserAuthorityInfoSavePostRequest
 */
export interface UserAuthorityInfoSavePostRequest {
    /**
     * 
     * @type {string}
     * @memberof UserAuthorityInfoSavePostRequest
     */
    'userId': string;
    /**
     * 
     * @type {Array<UserAuthorityInfoSavePostRequestDataInner>}
     * @memberof UserAuthorityInfoSavePostRequest
     */
    'data': Array<UserAuthorityInfoSavePostRequestDataInner>;
}

