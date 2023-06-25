import { Configuration } from "./weiwai/configuration";
import globalAxios, { AxiosInstance } from "axios";
import { BASE_PATH, BaseAPI } from "./weiwai/base";

type ApiType<T extends BaseAPI> = new (config?: any) => T;
export class FactoryApi {
  protected configuration: Configuration | undefined;

  constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected axios: AxiosInstance = globalAxios) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
  public static createAPIInstance<T extends BaseAPI>(apiType: ApiType<T>, config?: any): T {
    return new apiType(config);
  }

}
