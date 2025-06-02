import { createContext, useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { axiosInstance } from "../utils/axiosInstance";
export const TenantContext = createContext();

const TenantProvider = ({ children }) => {
  const [isLoading, SetisLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const { token } = useAppContext();
  const [locValue, setLocValue] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");

  // api call
  const fetchProperties = async () => {
    if (token) {
      SetisLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/property?page=${page}&location=${locValue}&budget=${budget}&type=${type}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);

        setProperties(data.properties);
        setPage(data.currentPage);
        setTotal(data.totalProperties);
        setTotalPages(data.totalPages);
        SetisLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchProperties();
  }, [token, page, locValue, budget, type]);

  const resetFilters = () => {
    setPage(1);
    setLocValue("");
    setBudget("");
    setType("");
  };

  return (
    <TenantContext.Provider
      value={{
        isLoading,
        properties,
        page,
        setPage,
        totalPages,
        total,
        setLocValue,
        resetFilters,
        setBudget,
        setType,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
export default TenantProvider;
