// "use server"
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path';
import YTMusic from "ytmusic-api";
import ytdl from 'ytdl-core';


type ResponseData = {
    message: string
}

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req.query;

    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    if (method === "getSearchSuggestions") {
        const { q } = req.query;

        if (typeof q === "string") {
            ytmusic.getSearchSuggestions(q).then((result: string[]) => {
                // console.log(r);
                if (result.length != 0) {
                    resolve();
                    res.json(result);
                    res.status(200).end();
                }
            }).catch(error => {
                res.json(error);
                res.status(405).end();
                resolve();
            });
        } else {
            res.json("q=''");
            res.status(405).end();
            resolve();
        }
    }

    else if (method === "getSearchResult") {
        const { type } = req.query;
        const { q } = req.query;

        if (typeof q === "string" && typeof type === "string") {
            if (type === "SONG") {
                ytmusic.searchSongs(q).then(results => {
                    // console.log(results)
                    if (results.length != 0) {
                        resolve();
                        res.json(results);
                        res.status(200).end();
                    }
                }).catch(error => {
                    res.json(error);
                    res.status(405).end();
                    resolve();
                });
            }

            else if (type === "VIDEO") {
                ytmusic.searchVideos(q).then(results => {
                    // console.log(results)
                    if (results.length != 0) {
                        resolve();
                        res.json(results);
                        res.status(200).end();
                    }
                }).catch(error => {
                    res.json(error);
                    res.status(405).end();
                    resolve();
                });
            }

            else if (type === "ARTIST") {
                ytmusic.searchArtists(q).then(results => {
                    // console.log(results)
                    if (results.length != 0) {
                        resolve();
                        res.json(results);
                        res.status(200).end();
                    }
                }).catch(error => {
                    res.json(error);
                    res.status(405).end();
                    resolve();
                });
            }

            else if (type === "PLAYLIST") {
                ytmusic.searchPlaylists(q).then(results => {
                    // console.log(results)
                    if (results.length != 0) {
                        resolve();
                        res.json(results);
                        res.status(200).end();
                    }
                }).catch(error => {
                    res.json(error);
                    res.status(405).end();
                    resolve();
                });
            }

        } else {
            res.json("q=''");
            res.status(405).end();
            resolve();
        }
    }

    else if (method === "getArtist") {
        const { artistId } = req.query;

        if (typeof artistId === "string") {
            ytmusic.getArtist(artistId).then(results => {
                resolve();
                res.json(results);
                res.status(200).end();
            }).catch(error => {
                res.json(error);
                res.status(405).end();
                resolve();
            });
        }
    }

    else if (method === "getPlaylist") {
        const { playlistId } = req.query;

        if (typeof playlistId === "string") {
            await ytmusic.getPlaylist(playlistId).then(results => {
                resolve();
                res.json(results);
                res.status(200).end();
            }).catch(error => {
                res.json(error);
                res.status(405).end();
                resolve();
            });
        }
    }

    else if (method === "getPlaylistVideos") {
        const { playlistId } = req.query;

        if (typeof playlistId === "string") {
            ytmusic.getPlaylistVideos(playlistId).then(results => {
                resolve();
                res.json(results);
                res.status(200).end();
            }).catch(error => {
                res.json(error);
                res.status(405).end();
                resolve();
            });
        }
    }

    else if (method === "getStream") {
        const { videoId } = req.query;

        if (typeof videoId === "string") {
            try {
                const videourl = `https://www.youtube.com/watch?v=${videoId}`;
                const videoInfo = await ytdl.getInfo(videourl);
                const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
                resolve();
                res.json(audioFormats);
                res.status(200).end();
                // console.log('served...');
            } catch (error) {
                res.json(error);
                res.status(405).end();
                resolve();
            }
        }
    }

}