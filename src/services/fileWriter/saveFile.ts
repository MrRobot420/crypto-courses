import fs from 'fs'

export const saveData = (data: object) => {
    const path: string = '/Users/max/code/ts/crypto/apis/coin-market-cap/data/data.json'
    console.log('writing data...')
    fs.writeFileSync(path, JSON.stringify(data))
}