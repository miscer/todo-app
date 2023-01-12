export async function createFetcher(key: string, options: any) {
  const url = "/api/" + key;
  const body = JSON.stringify(options.arg);
  const response = await fetch(url, { method: "POST", body });

  if (!response.ok) {
    throw new Error(
      `Failed to create resource, got response ${response.status}`
    );
  }

  return await response.json();
}
