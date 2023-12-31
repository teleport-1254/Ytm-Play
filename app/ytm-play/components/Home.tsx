const Home = () => {
    return (
        <>
            <div className='position-absolute text-center top-50 start-50 h-100 w-100 bg-dark-subtle translate-middle'>
                <div className='position-relative top-50 start-50 p-5 translate-middle'>
                    <h1 className='fw-semibold display-1 glow-color-animation-text'>Ytm_play</h1>
                    <p className='fs-6 lh-base text-body-secondary'>
                        Ytm_Play is a web music player for YouTube music. Made with Next.js + React.js.
                        It uses YouTube and Google APIs to search and get music, video, artist and playlist data. <br />
                        The project is in the development stage, and may have bugs, so try not to be rough. <br />
                        <i>
                            "nahi to code phat jayega!"
                        </i> <br />
                        🙂🙂🙂
                    </p>
                    <div className="position-relative">
                        <a className="m-2" href="https://github.com/teleport-1254/Ytm-Play">
                            <img src="assets/images/github.svg" alt="github" title="GitHub" width={40} height={40} />
                        </a>
                        <a className="m-2" href="https://x.com/Prabhat75279531?t=UChCR1Utkm4f43xDTi_vwg&s=09">
                            <img src="assets/images/twitterx.svg" alt="twitter" title="Twitter" width={40} height={40} />
                        </a>
                        <a className="m-2" href="https://www.instagram.com/teleport_1254/?igshid=YTQwZjQ0NmI0OA%3D%3D">
                            <img src="assets/images/instagram.svg" alt="instagram" title="Instagram" width={50} height={50} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;