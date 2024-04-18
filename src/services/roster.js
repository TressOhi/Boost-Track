import { axios } from "./axios";

export async function createRoster(data) {
  try {
    const response = await axios.post("/rosters/", data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}

export async function getRosters({ offset = 0, pageCount = 10 }) {
  try {
    const response = await axios.get(
      `/rosters/?offset=${offset}&page_count=${pageCount}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}
