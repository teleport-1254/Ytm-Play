import Info from './InfowithPlayer';
// import { useState } from 'react';
import { OptionBoxProps } from '../typings/intefaces.js';
import ReactLoading from 'react-loading';
import { useState } from 'react';

const OptionBox = ({ changeTab, queue, songIndex, emptyQueueBtn, removeSong, setItemClicked, setAppLoadingState }: OptionBoxProps) => {

    const [tab, setTab] = useState<"HOME" | "SEARCH">('HOME');

    // can be used for next track, too
    const finishedPlaying = () => {
        if (songIndex + 1 < queue.length) {
            setItemClicked(songIndex + 1);
        } else {
            setItemClicked(0);
        }
    }

    const prevTrack = () => {
        if (songIndex - 1 > 0) {
            setItemClicked(songIndex - 1);
        } else {
            setItemClicked(queue.length - 1);
        }
    }

    const handleClick = (index: number) => {
        setItemClicked(index);
    }
    // console.log(queue);

    return (
        <>
            <div className='postion-relative'>
                <div className='position-fixed'>
                    <div className='d-flex w-100 vertical-text pb-4 display-5 fw-bold glow-color-animation-text'>
                        Ytm_Play
                    </div>
                    <div className={
                        tab === "HOME" ?
                            'd-flex fs-4 vertical-text pb-4' :
                            'd-flex fs-4 vertical-text pb-4 text-body-tertiary'
                    }
                        onClick={() => {
                            changeTab("HOME");
                            setTab("HOME");
                        }}>
                        Home
                    </div>

                    <div className={
                        tab === "SEARCH" ?
                            'd-flex fs-4 vertical-text pb-4' :
                            'd-flex fs-4 vertical-text pb-4 text-body-tertiary'
                    }
                        onClick={() => {
                            changeTab("SEARCH");
                            setTab("SEARCH");
                        }}>
                        Search
                    </div>
                </div>

                {songIndex > -1 && <Info setAppLoadingState={setAppLoadingState} infoData={queue[songIndex]} whenFinishedPlaying={finishedPlaying} prevTrack={prevTrack} />}

                <div className='z-4'>
                    <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex={-1} id="queue-offcanvas" aria-labelledby="queue-offcanvasLable">
                        <div className="offcanvas-header">
                            <div>
                                <h4 className="offcanvas-title" id="queue-offcanvasLable">Queue</h4>
                                <h6>{queue.length} Tracks</h6>

                                <div className='d-flex'>
                                    <img onClick={emptyQueueBtn} src="assets/images/delete.svg" alt="remove all" title='Remove all Songs' width={30} height={30} />
                                    <h6 className='p-2 ps-1'>Remove all Songs</h6>
                                </div>

                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body p-0">
                            <ul className="list-group">
                                {
                                    queue.map((item, index) => (
                                        (item[0] != '0') &&
                                        <li key={index} className={songIndex == index ? "list-group-item border border-0 bg-dark-subtle" : "list-group-item border border-0"}>
                                            <div className='d-flex'>
                                                {songIndex == index &&
                                                    <ReactLoading className='position-absolute opacity-100 z-1' type={'bars'} color={'#fff'} height={50} width={60} />
                                                }
                                                {/* <img className='position-absolute opacity-100 z-1' src="assets/images/play.svg" alt="play" width={60} /> */}
                                                <img onClick={() => handleClick(index)} className={songIndex == index ? "object-fit-cover rounded-2 opacity-50" : "object-fit-cover rounded-2 opacity-100"} src={item[4]} alt={item[2]} height={60} width={60} />
                                                <div onClick={() => handleClick(index)} className=''>
                                                    <h5 className='m-0 p-0 ps-2 one-line-text-w-275'>{item[2]}</h5>
                                                    <small className='m-0 p-0 ps-2 one-line-text-w-30'>{item[3]}</small>
                                                </div>
                                                {/* <img onClick={() => {
                                                    if (songIndex > index) {
                                                        setItemClicked(0);
                                                    }
                                                    removeSong(index);
                                                }}
                                                    className='m-1' src="assets/images/remove.svg" alt="remove all" title='Remove all Songs' width={20} height={20} /> */}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OptionBox;