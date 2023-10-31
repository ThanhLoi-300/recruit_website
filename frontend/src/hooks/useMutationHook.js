import { useMutation } from '@tanstack/react-query';

const useMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack,
    });
    return mutation;
};

export default useMutationHook;
