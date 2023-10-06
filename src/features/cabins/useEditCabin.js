import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient();
    const {mutate:editCabin,isLoading:isEditLoading} = useMutation({
        mutationFn : ({newCabin,id}) => createEditCabin(newCabin,id),
        onSuccess : () => {
          toast.success('Cabin Successfully Edited');
          queryClient.invalidateQueries({queryKey:["cabins"]});
        },
        onError : (err) => toast.error(err.message)
      })
    return {editCabin,isEditLoading}
}
