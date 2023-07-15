import request from "../utils/request.js"
export const home = () => {
    return request({
        url: "/home",
        method: "get"
    })
}