export function convertStore(ogStore) {
    const newStore = {};

    for (let i = 0; i < ogStore.length; i++) {
        const row = ogStore[i];
        if (!row.kitsu_id && !row.livechart_id)
            continue;
        newStore[row.mal_id] = {
            livechart_id: row.livechart_id,
            kitsu_id: row.kitsu_id
        }
    }


    return newStore;
}
