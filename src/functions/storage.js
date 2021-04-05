//Copyright 2020, Provecho, All rights reserved.

import Amplify, { Storage } from 'aws-amplify'

import awsconfig from '../aws-exports'
Amplify.configure(awsconfig);

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const upload = async (uri) => {
    try {
        const res = await fetch(uri)
        const blob = await res.blob()
        const { key } = await Storage.put(uuidv4(), blob, {
            contentType: 'image/jpeg'
        })
        return key
    } catch (err) {
        console.log(err)
    }
}

const getKeys = async (list) => {
    return Promise.all(list.map(uri => upload(uri)))
}
export const upload_multiple = async (list) => {
    const keys = await getKeys(list).then((data) => {
        return data
    })
    return keys
}

const format_image = async (item) => {
    const image = await Storage.get(item)
    return image
}
const getImages = async (list) => {
    return Promise.all(list.map(image => format_image(image)))
}
const format_images = async (list) => {
    const images = await getImages(list).then((data) => {
        return data
    })
    return images
}

const getPosts = async (list, is_single) => {
    return Promise.all(list.map(post => format_post(post, is_single)))
}
export const format_posts = async (db_data, is_single) => {
    const posts = await getPosts(db_data, is_single).then((data) => {
        return data
    })
    return posts
}

// export const format_chef = async (item) => {
//     console.log('item..', item);
//     const chef_image = await Storage.get(item.image)
//     delete item.image
//     const chef = {
//         ...item,
//         image: chef_image,
//     }
//     return chef
// }
const getChefs = async (list) => {
    return Promise.all(list.map(chef => format_chef(chef)))
}
export const format_chefs = async (db_data) => {
    const chefs = await getChefs(db_data).then((data) => {
        return data
    })
    return chefs
}

const getNotifications = async (list) => {
    return Promise.all(list.map(notification => format_notification(notification)))
}
export const format_notifications = async (db_data) => {
    const notifications = await getNotifications(db_data).then((data) => {
        return data
    })
    return notifications
}


const getLikes = async (list) => {
    return Promise.all(list.map(like => format_chef(like.chef)))
}
export const format_likes = async (db_data) => {
    const likes = await getLikes(db_data).then((data) => {
        return data
    })
    return likes
}

// export const format_commment = async (item, is_tip) => {
//     const comment_chef = await format_chef(item.chef)
//     delete item.chef
//     if (is_tip) {
//         const comment_post = await format_post(item.post, true)
//         delete item.post
//         const comment = {
//             ...item,
//             chef: comment_chef,
//             post: comment_post,
//         }
//         return comment
//     } 
//     const comment = {
//         ...item,
//         chef: comment_chef,
//     }
//     return comment
// }
// const getComments = async (list, is_tip) => {
//     return Promise.all(list.map(comment => format_commment(comment, is_tip)))
// }
// export const format_comments = async (db_data, is_tip) => {
//     const comments = await getComments(db_data, is_tip).then((data) => {
//         return data
//     })
//     return comments
// }







//////////////////////////////////////////////////////////////////////

export const format_chef = async (item) => {
    console.log('item..', item);
    const chef_image = await Storage.get(item.image)
    delete item.image
    const chef = {
        ...item,
        image: chef_image,
    }
    return chef
}

export const format_preview = async (item) => {
    console.log('item...', item);
    let new_item = JSON.parse(JSON.stringify(item))
    const post_image = await format_image(new_item.image[0])
    let post_images = [...new_item.image]
    post_images[0] = post_image
    delete new_item.image
    const post = {
        ...new_item,
        image: post_images,
    }
    return post
}

export const format_post = async (item) => {
    let new_item = JSON.parse(JSON.stringify(item))
    let post_image = null
    //is litarally seeing if the thumbail has been formatted by cheking if its longer than a uuid
    if (new_item.image[0].length > 50) {
        let post_images = [...new_item.image]
        const thumbnail = new_item.image[0]
        post_images.shift()
        post_image = await format_images(post_images)
        post_image.unshift(thumbnail)
    } else {
        post_image = await format_images(new_item.image)
    }
    const chef_image = await Storage.get(new_item.chef.image)
    delete new_item.image
    delete new_item.chef.image
    const chef = {
        ...new_item.chef,
        image: chef_image,
    }
    const post = {
        ...new_item,
        image: post_image,
        chef,
    }
    return post
}

export const format_notification = async (item) => {
    let new_item = JSON.parse(JSON.stringify(item))
    const post = item.post ? await format_preview(item.post) : null
    const chef_image = await Storage.get(new_item.sender.image)
    delete new_item.sender.image
    delete new_item.post
    const notification = {
        ...new_item,
        sender: {
            ...new_item.sender,
            image: chef_image,
        },
        post,
    }
    return notification
}

export const format_like = async (item) => {
    let new_item = JSON.parse(JSON.stringify(item))
    const comment_chef = await format_chef(new_item.chef)
    delete new_item.chef
    const comment = {
        ...new_item,
        chef: comment_chef,
    }
    return comment
}