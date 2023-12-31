import '../assets/css/CustomeComponentStyle.css';
import '../assets/css/react_audio_player_Ctk.css';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { InfoProps } from '../typings/intefaces';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { videoFormat } from 'ytdl-core';
import Toast from 'react-bootstrap/Toast';

const Info = ({ infoData, whenFinishedPlaying, prevTrack, setAppLoadingState }: InfoProps) => {

    const [src, setSrc] = useState<string | undefined>();
    const [errorToast, setErrorToast] = useState(false);
    const [errorVideoId, setErrorVideoId] = useState<string | undefined>();
    const [errorTitle, setErrorTitle] = useState<string | undefined>();

    const handleAudioSrc = async () => {
        if (typeof infoData[0] == "string" && infoData[1] == undefined) {
            await fetch('api/ytmusic?method=getStream&videoId=' + infoData[0])
                .then(data => data.json())
                .then((data: Array<videoFormat>) => {
                    // selecting url of audioBitrate: 128kbps
                    if (data[1] !== undefined) {
                        infoData[1] = data[1].url;
                        setSrc(data[1].url);
                    } else {
                        console.log("Something went wrong!");
                        setSrc(undefined);

                        setErrorToast(true);
                        setErrorVideoId(infoData[0])
                        setErrorTitle(infoData[2]);
                        setAppLoadingState(false);

                        whenFinishedPlaying();
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            setSrc(infoData[1]);
        }
    }

    return (
        <div
            id='media-card'
            className="position-fixed bottom-0 w-100 pb-0">
            <div className='position-absolute w-100 h-100 z-0'
                style={{
                    backgroundColor: "#00000099"
                }}>
                <img
                    src={infoData[4]}
                    className='w-100 h-100 object-fit-cover'
                    style={{
                        WebkitFilter: "blur(50px) brightness(50%)",
                    }} />
            </div>
            <div className="position-relative z-1 p-2">
                <div className="d-flex">
                    <div className="position-relative mb-2">
                        {
                            (infoData[4] != undefined) ?
                                <img
                                    id='media-card-thumbnail'
                                    src={infoData[4]}
                                    onLoad={handleAudioSrc}
                                    width={110} height={110}
                                    className="object-fit-cover img rounded-2"
                                    alt={infoData[2]}
                                    data-bs-toggle="offcanvas" data-bs-target="#queue-offcanvas" aria-controls="staticBackdrop" /> :
                                <Skeleton className='object-fit-cover img rounded-2' width={110} height={110} baseColor='#999' />
                        }
                    </div>
                    <div className='p-2 pt-0 mt-2 ps-3 w-100'>
                        {
                            (infoData[2] != undefined) ?
                                <h2 className="card-title one-line-text-w-100 pb-1" title={infoData[2]}>{infoData[2]}</h2> :
                                <Skeleton className='card-title w-50 p-2' baseColor='#888' highlightColor='#999' />

                        }
                        {
                            (infoData[3] != undefined) ?
                                <h6 className="card-text one-line-text-w-100 mb-0">{infoData[3]}</h6> :
                                <Skeleton className='card-title w-25 mt-2 p-1' baseColor='#888' highlightColor='#999' />

                        }
                        <div className='p-0 m-0'>
                            <button className="btn p-0 ms-0 m-1 mt-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#queue-offcanvas" aria-controls="staticBackdrop">
                                <div className='d-flex'>
                                    <img src="assets/images/queue.svg" className='me-2' title='Queue' width={20} />
                                    Queue
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-100 d-flex bg-transparent'>
                    <AudioPlayer
                        autoPlay
                        src={src}
                        onPlay={() => setAppLoadingState(false)}
                        onEnded={whenFinishedPlaying}
                        showSkipControls={true}
                        showJumpControls={false}
                        onError={(e) => setErrorToast(true)}
                        onPlayError={(e) => setErrorToast(true)}
                        onClickPrevious={() => {
                            prevTrack();
                            setSrc(undefined);
                        }}
                        onClickNext={() => {
                            whenFinishedPlaying();
                            setSrc(undefined);
                        }}
                    />

                </div>


                <div className='position-fixed bottom-0 end-0 m-2'>
                    <Toast show={errorToast} onClose={() => { setErrorToast(false) }} className='border border-0'>
                        <Toast.Header className='bg-danger border border-0'>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto text-white">Error while fetching stream</strong>
                        </Toast.Header>
                        <Toast.Body className='bg-danger-subtle border border-0'>
                            videoId: {errorVideoId} <br />
                            title: {errorTitle} <br />
                            Something went wrong while fetching stream.
                        </Toast.Body>
                    </Toast>
                </div>

            </div>
        </div >
    );
}

export default Info;
