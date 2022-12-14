/* Creates a url to access the backend server
 * Example: getBackendUrl('path') -> https://api.server.com/path/
 * */
export function getBackendUrl(path: string, trailingSlash = true) {
    const host = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : "http://127.0.0.1:8000"
    let url = new URL(path, host).href
    if (!url.endsWith("/") && !url.includes("?") && trailingSlash) url += "/"
    return url
}

export function getIpfsUrl(cid: string) {
    const host = process.env.NEXT_PUBLIC_IPFS_URL
        ? process.env.NEXT_PUBLIC_IPFS_URL
        : "http://{cid}.ipfs.localhost:8080"
    const url = host.replace('{cid}', cid)
    return url
}
