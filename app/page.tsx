"use client"

function home() {
    return (
        <div className="w-100 bg-black" style={{
            height: "100vh"
        }}>
            <div className="position-absolute top-50 start-50 translate-middle w-100">
                <div className='text-center w-100'>
                    <h1 className='fw-semibold display-1'>Ytm_play</h1>
                    <p className='fs-6 lh-base text-white-50'>
                        Ytm_Play is a web music player for YouTube music. Made with Next.js + React.js.
                        It uses YouTube and Google APIs to search and get music, video, artist and playlist data. <br />
                        The project is in the development stage, and may have bugs, so try not to be rough. <br />
                        <i>
                            "nahi to code phat jayega!"
                        </i> <br />
                        🙂🙂🙂
                    </p>
                </div>

                <div className="text-center text-white-50 m-2">
                    <h5>Disclaimer</h5>
                    This is personal project and its contents are not funded, authorized, endorsed by, or in any way associated with YouTube, Google LLC or any of its affiliates and subsidiaries. <br />
                    Any trademark, service mark, trade name, or other intellectual property rights used in this project are owned by the respective owners.
                </div>

                <div className="text-center">
                    <a href="/ytm-play" className="btn bg-white text-black fw-bold">continue to Ytm-Play</a>
                    <div className="m-2">
                        <a className="m-2" href="mailto:wordforprabhat1254@gmail.com" target="_blank">
                            <img src="assets/images/gmail.svg" alt="gmail" title="Gmail" width={40} height={40} />
                        </a>
                        <a className="m-2" href="https://github.com/teleport-1254/Ytm-Play">
                            <img src="assets/images/github.svg" alt="github" title="GitHub" width={40} height={40} />
                        </a>
                        <a className="m-2" href="https://www.instagram.com/teleport_1254/?igshid=YTQwZjQ0NmI0OA%3D%3D">
                            <img src="assets/images/instagram.svg" alt="instagram" title="Instagram" width={50} height={50} />
                        </a>
                        <a className="m-2" href="https://x.com/Prabhat75279531?t=UChCR1Utkm4f43xDTi_vwg&s=09">
                            <img src="assets/images/twitterx.svg" alt="twitter" title="Twitter" width={40} height={40} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default home;
