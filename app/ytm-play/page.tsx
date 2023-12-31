"use client"

import SearchBox from "./components/SearchBox";
import OptionBox from "./components/OptionBox";
import ReactLoading from 'react-loading';
import { useState } from "react";
import queue from "./utils/playQueue";
import { addToQueue, changeQueue } from "./utils/playQueue";
import Home from "./components/Home";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../../node_modules/jquery/dist/jquery.min.js";

function App() {
    const [queueState, setQueueState] = useState<Array<Array<string>>>(queue);
    // const [songQueueFromPlaylist, setSongQueueFromPlaylist] = useState<Array<Array<string>>>();

    const [songIndex, setSongIndex] = useState(-1);
    const [tab, setTab] = useState('HOME');

    const changeTab = (tab: "HOME" | "SEARCH") => {
        setTab(tab);
    }

    function gettingInfo(videoId: string, name: string, artist: string, thumbnail: string) {
        let i = addToQueue([videoId, undefined, name, artist, thumbnail]);
        setSongIndex(i);
        // setQueueState(queue);
        // console.log(songIndex);
    }

    // adding songs in playlist to queue
    const settingQueue = (songs: Array<Array<string | undefined>>) => {
        let i = changeQueue(songs);
        setQueueState(i);
        setSongIndex(0);
        // console.log(queue);
    }

    const emptyUpQueue = () => {
        let i = changeQueue([]);
        setQueueState(i);
        setSongIndex(-1);
    }

    const removeIndex = (index: number) => {
        let i = queueState.slice(index, 1);
        setQueueState(i);
    }

    const setItemClicked = (item: number): void => {
        setSongIndex(item);
    }

    const [isLoading, setIsLoading] = useState(false);
    const setAppLoadingState = (state: boolean) => {
        setIsLoading(state);
    }

    return (
        <>
            {/* adding bootstrap css and js */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
            <div className="position-fixed z-5 top-50 start-50 translate-middle">
                {isLoading && <ReactLoading type={'bars'} color={'#fff'} height={100} width={100} />}
            </div>

            <div className={isLoading ? 'opacity-50' : ""}>
                <div className="position-absolute end-0 h-100 user-select-none"
                    style={{
                        width: "clamp(18rem, 0rem + 90vw, 180rem)"
                    }}>
                    {
                        tab === "HOME" ?
                            <Home /> :
                            <SearchBox gettingInfo={gettingInfo} settingQueue={settingQueue} setAppLoadingState={setAppLoadingState} />
                    }
                </div>
                <div className="position-absolute start-0 user-select-none"
                    style={{
                        width: "clamp(1rem, 0rem + 10vw, 6rem)"
                    }}>
                    <OptionBox changeTab={changeTab} queue={(songIndex > -1) ? queueState : queueState} songIndex={songIndex} emptyQueueBtn={emptyUpQueue} removeSong={removeIndex} setItemClicked={setItemClicked} setAppLoadingState={setAppLoadingState} />
                </div>
            </div >
        </>
    );
}

export default App
