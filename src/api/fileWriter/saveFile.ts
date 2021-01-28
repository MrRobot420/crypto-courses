import fs from 'fs'
import config from 'config'

export const saveData = (data: object) => {
    const BASE_PATH: string = config.get('BASE_PATH')
    const path: string = `${BASE_PATH}/data.json`
    console.log('writing data...')
    fs.writeFileSync(path, JSON.stringify(data))
}