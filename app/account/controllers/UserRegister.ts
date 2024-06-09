import {axiosApi, showInformation} from "components/utilis";
import {login} from "../../../lib/reducers/accountSlicer";
import {toggleOpenLogin} from "../../../lib/reducers/appSlicer";
import {useDispatch} from "react-redux";


export const userRegister = async (data: {
    email: string | undefined;
    password: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
}) => {
    const config =
        { withCredentials:false,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
    };

    const {email, password, firstname, lastname} = data;
    try {
        if (!email || !password)
            throw new Error("all fields are required");
        // Make a request to your authentication endpoint
        const response = await axiosApi.post(
            `/auth/register/`,
            {
                email,
                password,
                firstname,
                lastname,
            },
            config
        );

        if (response.status === 200) {
            const token = response.data.token;
            showInformation("account created, plz check your email to confirmn then login");

            return response;
        } else if (response.status === 403) {
            //throw new Error("user doesnt exisit");
            showInformation(response.data);
            throw new Error(response.data);
        }
    } catch (error:any) {
        showInformation(error.response.data);
        throw new Error(error.response.data);
    }
};
