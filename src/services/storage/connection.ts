import { connect } from 'mongoose'

class Connection  {
    constructor(url: string) {
        this.establishConnection(url)
    }

    establishConnection(url: string) {
        connect(url).then(() => {
            console.log('Database connection successful.')
        }).catch(err => {
            console.log('Database connection error.');
        })
    }
}

export default Connection