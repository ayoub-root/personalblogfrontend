import {RootState} from "lib/store";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosApi} from "./utilis";
import {login, updateLoggedAccount} from "lib/reducers/accountSlicer";

const useCheckLoggedIn = (onSuccess: any, onError: any) => {
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axiosApi.get("/auth/logged");
                const data = response.data;
                dispatch(updateLoggedAccount(data));
                onSuccess(data);
            } catch (error) {
                onError(error);
            }
        };

        if (!loggedAccount) {
            checkLoggedIn();
        }
    }, [loggedAccount]); // Include loggedAccount in the dependency array

    return {
        loggedAccount,
    };
};

export default useCheckLoggedIn;
