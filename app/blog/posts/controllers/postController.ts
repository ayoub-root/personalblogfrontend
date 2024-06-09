import {axiosApi, showInformation} from "../../../../components/utilis";

export async function addToSavedList(data: any) {

 await   axiosApi.post("/users/saveditems", {

        title: data?.title,
        type: data?.type,
        value: data?.value,
        image: data?.image,
    }).then(e => {
        showInformation('Item added successfully');
    }).catch(e => {
        showInformation('error');
    })
}

export async function getSavedList() {
    try {
        const response = await axiosApi.get("/users/saveditems");

        return response.data?.body;
    } catch (error) {

        return null;
    }
}

export async function removeFromSavedList(slug: any) {

    await axiosApi.delete(`/users/saveditems/${slug}`).then(e => {
        showInformation('Item removed successfully');
    }).catch(e => {
        showInformation('error');
    })
}

export async function handleRaction(postId: string, type: number) {
 await   axiosApi.post(`/posts/${postId}/react`, {

        type: type
    }).then(e => {

        showInformation('update reaction');
    }).catch(e => {
        showInformation('error');
    })
}