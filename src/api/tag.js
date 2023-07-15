import request from "../utils/request.js"
export const tags = () => {
    return request({
        url: "/tags",
        method: "get"
    })
}