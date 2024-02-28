export const useHttp = () => {
  const getData = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  const patchData = async (
    url,
    method = "PATCH",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  const postData = async (
    url,
    method = "POST",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  const deleteData = async (
    url,
    method = "DELETE",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  return {
    getData,
    patchData,
    postData,
    deleteData,
  };
};
