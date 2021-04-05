import * as global from './global'

let idols = []
const limit = 5

export const update = async (user) => {
    const db_data = await global.fetch_idol_usernames(user)
    idols = db_data
}

export const get_usernames = (prefix) => {
    let usernames = []
    idols.every((idol) => {
        if(idol.username.startsWith(prefix)) {
            usernames.push(idol.username)
        }
        if(usernames.length > limit) {
            return false
        }
        return true
    })
    return usernames
}