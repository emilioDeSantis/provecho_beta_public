//Copyright 2020, Provecho, All rights reserved.


//if u refresh a redudnadt screen the cash will be messed up for the other one
const limit = 5

let cache = {}

const run_fetch_queue = (id) => {
    const run_func = () => {
        const first_item = cache[id].fetch_queue[0]
        if(cache[id].list[first_item.index]){
            const curr_func = cache[id].fetch_queue.shift()
            curr_func.func(cache[id].list[curr_func.index])
        } else{
            return
        }
        if(cache[id].fetch_queue.length > 0) {
            run_func()
        }
    }
    if(cache[id].fetch_queue.length > 0) {
        run_func()
    }
}

export const fetch = async ({id, index, query, func}) => {
    if(!cache[id]) {
        cache[id] = {
            list: [],
            next_token: null,
            fetch_queue: [],
            is_quering: false,
        }
    }
    cache[id].fetch_queue.push({func, index})
    run_fetch_queue(id)
    const update_cache = async () => {
        if (cache[id].list.length - index < limit) {
            if(cache[id].next_token != 'end') {    
                if(!cache[id].is_quering) {
                    cache[id].is_quering = true
                    const [new_list, new_next_token] = await query({next_token: cache[id].next_token, limit})
                    cache[id].next_token = new_next_token ? new_next_token : 'end'
                    cache[id].list = [...cache[id].list, ...new_list]
                    update_cache()
                    run_fetch_queue(id)
                    cache[id].is_quering = false
                }
            }
        }
    }
    update_cache()
}

export const refresh = async (id) => {
    if(!cache[id]) {
        return
    }
    cache[id].list = []
    cache[id].next_token = null
    cache[id].fetch_queue = []
    cache[id].is_quering = false
}

export const clear = () => {
    cache = {}
}