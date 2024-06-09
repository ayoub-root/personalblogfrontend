
import {axiosApi, showInformation} from "components/utilis";
import {login} from "../../../lib/reducers/accountSlicer";


export const userLogin = async (data: {
    email: string | undefined;
    password: string | undefined;
    keepLogged: boolean | any;
}) => {

    const {email, password, keepLogged} = data;
    try {
        if (!email || !password)
            throw new Error("Veuillez remplir tous les champs.");
        // Make a request to your authentication endpoint
        const response = await axiosApi.post(`/auth/login`, {
            email,
            password,
            keepLogged,
        });

        if (response.status === 200) {

            showInformation("welcome "+response?.data?.firstname);
            return response;
        }
    } catch (ress: any) {
        let error = ress?.response;


        //throw new Error("user doesnt exisit");
        showInformation(error.data);


    }
};
