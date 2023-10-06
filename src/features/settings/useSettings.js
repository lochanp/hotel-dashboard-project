import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";


export default function useSettings() {
  const {isLoading,error,data:settingsData } = useQuery({
    queryKey : ['setting'],
    queryFn : getSettings
  })
  return {isLoading,error,settingsData}
}
