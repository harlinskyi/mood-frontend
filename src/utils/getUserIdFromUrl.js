export default function getUserIdFromUrl(pathname) {
    let id = ''
    if (pathname != '' && pathname != null) {
        id = /[0-9]+/g.exec(pathname)
    }
    console.log('id', id)
    return id;
}