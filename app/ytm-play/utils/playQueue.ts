let queue: Array<Array<string>> = [];
export default queue;

export const addToQueue = (song: Array<any>): number => {
    let flag: number = -1;
    queue.map((item, index) => {
        if (song[0] == item[0]) {
            flag = index;
        }
    });
    
    if (flag == -1) {
        queue.push(song);
        return queue.length - 1;
    }
    return flag;
}

export const changeQueue = (songs: Array<Array<any>>): Array<Array<string>> => {
    queue = songs;
    // console.log(queue);
    return queue;
}