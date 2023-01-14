export const createReadFetcher = (url: string) => async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource, got response ${response.status}`
    );
  }

  return await response.json();
};

export const createUpdateFetcher =
  (url: string, method = "POST") =>
  async (_key: any, options: any) => {
    const body = JSON.stringify(options.arg);
    const response = await fetch(url, { method, body });

    if (!response.ok) {
      throw new Error(
        `Failed to update resource, got response ${response.status}`
      );
    }

    return await response.json();
  };

export const createDeleteFetcher =
  (url: string, method = "DELETE") =>
  async () => {
    const response = await fetch(url, { method });

    if (!response.ok) {
      throw new Error(
        `Failed to delete resource, got response ${response.status}`
      );
    }
  };
