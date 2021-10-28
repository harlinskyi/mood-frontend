export default function isNotEmpty(value) {
    let string = (value !== undefined && value !== null && value !== '') ? true : false;
    return string
}