import apiClient from "./api-client";

interface Entity {
  id: number;
}
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  add<T>(newEntity: T) {
    const request = apiClient.post(this.endpoint, newEntity);
    return { request };
  }

  update<T extends Entity>(entity: T, updatedEntity: T) {
    const request = apiClient.patch(
      this.endpoint + "/" + entity.id,
      updatedEntity
    );

    return { request };
  }

  delete<T extends Entity>(entity: T) {
    const request = apiClient.delete(this.endpoint + "/" + entity.id);

    return { request };
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
