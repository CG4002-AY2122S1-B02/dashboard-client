export const GetStringElement = (message, key) => {
    var half = message.split(key + ':"')
    if (half.length < 2) return null
    var x = String(half[1])
    return x.split('" ')[0]
}

export const GetNumericElement = (message, key) => {
    var half = message.split(key + ':')
    if (half.length < 2) return null
    return Number(String(half[1]).split(' ')[0])
}