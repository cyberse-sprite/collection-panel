import request from "../utils/request.js"

export const getComics = (current, filter) => {
    return request({
        url: "/comics",
        method: "get",
        params: {
            current,
            ...filter
        }
    })
}

export const getComicUploadInfo = () => {
    return request({
        url: "/comic/upload",
        method: "get"
    })
}

export const getComicThumb = (id) => {
    return process.env.VUE_APP_BASE_API_D + "/comic/thumb?id=" + id
}

export const getComic = (id) => {
    return request({
        url: "/comic",
        method: "get",
        params: {
            id
        }
    })
}

export const getComicRes = (id) => {
    return process.env.VUE_APP_BASE_API_D + "/comic/res?id=" + id
}

export const postComic = (formData) => {
    return request({
        url: "/comic",
        method: "post",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const setOwn = (id, own) => {
    return request({
        url: "/comic/own",
        method: "post",
        params: {
            id,
            own
        }
    })
}