const getBible = ( language, version ) => {
    const bible = require(`./${language}/${version}`)()
    return bible
}

console.log(getBible("pt-br", "NVI").judas[1][1])