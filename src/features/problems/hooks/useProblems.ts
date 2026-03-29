import { useQuery } from "@tanstack/react-query"
import { api } from "../../../services/api"

export const useProblems = () => {
  return useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const res = await api.get("/problems")
      return res.data
    }
  })
}
