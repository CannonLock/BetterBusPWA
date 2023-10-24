export function stringToColor(str: string): string {
    if(str[0] == "#"){
        return str
    } else {
        return "#" + str
    }
}