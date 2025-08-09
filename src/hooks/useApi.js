import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const fetchWithToken = async ({
  url,
  method = "GET",
  body,
  requiresAuth,
  customMessages = {},
  options = {},
  accessToken,
}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (requiresAuth && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    // Użyj credentials tylko gdy nie ma tokenu JWT
    ...(requiresAuth && accessToken ? {} : { credentials: "include" }),
    ...options,
  });

  if (!response.ok) {
    const status = response.status;
    const message =
      customMessages[status] || customMessages["default"] || `Błąd ${status}`;
    throw new Error(message);
  }

  return response.json();
};

export const useApi = ({
  url,
  method = "GET",
  body = null,
  queryKey = null,
  requiresAuth = true,
  customMessages = {},
  enabled = true,
  staleTime = 0,
  options = {},
}) => {
  const isGet = method.toUpperCase() === "GET";
  const { accessToken } = useAuth() || {};

  const queryFn = () =>
    fetchWithToken({
      url,
      method,
      body,
      requiresAuth,
      customMessages,
      options,
      accessToken,
    });

  if (isGet) {
    return useQuery({
      queryKey: queryKey || [url],
      queryFn,
      enabled,
      staleTime,
    });
  }

  const mutation = useMutation({
    mutationFn: (overrideBody) =>
      fetchWithToken({
        url,
        method,
        body: overrideBody || body,
        requiresAuth,
        customMessages,
        options,
        accessToken,
      }),
  });

  return mutation;
};
