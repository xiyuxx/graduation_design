
import {fetch} from '@tauri-apps/api/http'
import qs from 'qs'
const baseURL = 'http://localhost:8000'

// const BODY_TYPE = {
//     Form: 'Form',
//     Json: 'Json',
//     Text: 'Text',
//     Bytes: 'Bytes',
// }

const commonOptions = {
    timeout:5000,
}

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, requestedURL: string) => {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
}

const buildURL = (url: string, params: any): string => {
    if (!params) {
        return url
    }
    const serializedParams = qs.stringify(params)
    if (serializedParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
    return url
}

const http = <T>(url: string, options: any = {}):Promise<{data:T}> => {
    const params = { ...options.params }
    if (!options.headers) options.headers = {}

    const token = localStorage.getItem("_token");
    if(token){
        options.headers['_token'] = token
    }
    if (options?.body) {
        //if (options.body.type === BODY_TYPE.Form) {
            options.headers['Content-Type'] = 'multipart/form-data'
        //}
    }

    options = { ...commonOptions, ...options }
    return fetch(buildURL(buildFullPath(baseURL, url), params), options)
        .then(({ status, data ,headers}) => {
            if (status >= 200 && status < 400) {
                localStorage.setItem("_token",headers['_token'])
                return { data } as {data:T}
            }
            return Promise.reject({ status, data })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export default http