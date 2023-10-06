import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";


export default function useCabins() {
    const {isLoading, data : cabinsData } = useQuery({
        queryKey : ['cabins'],
        queryFn : getCabins
    })
    return {isLoading,cabinsData}
}
