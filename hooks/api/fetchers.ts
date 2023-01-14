export async function apiFetcher(key: string) {
  const url = "/api/" + key;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource, got response ${response.status}`
    );
  }

  return await response.json();
}

export const createUpdateFetcher =
  (url: string, method = "POST") =>
  async (_key: string, options: any) => {
    const body = JSON.stringify(options.arg);
    const response = await fetch(url, { method, body });

    if (!response.ok) {
      throw new Error(
        `Failed to update resource, got response ${response.status}`
      );
    }

    return await response.json();
  };
