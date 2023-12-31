import { MouseEvent, useState } from 'react';
import { SearchTypeProps } from '../typings/intefaces';

const SearchType = ({ gettingSelectedType }: SearchTypeProps) => {
    const types = ['Songs', 'Videos', 'Artists', 'Playlists'];

    const [typeSelected, setType] = useState(0);

    const handleClick = (e: MouseEvent<HTMLLIElement>, index: number) => {
        setType(index);
        // console.log(e.target.innerHTML);
        const liElement = e.target as HTMLLIElement;
        let type = liElement.innerHTML;

        switch (type) {
            case 'Songs':
                gettingSelectedType('SONG');
                break;
            case 'Videos':
                gettingSelectedType('VIDEO');
                break;
            case 'Artists':
                gettingSelectedType('ARTIST');
                break;
            case 'Playlists':
                gettingSelectedType('PLAYLIST');
                break;

        }
    }
    return (
        <nav className="navbar navbar-expand-lg p-0 bg-body-tertiary">
            <div className="container-fluid p-0 d-flex justify-content-center">
                <a className="navbar-toggler btn p-0 focus-ring-dark text-decoration-none border border-0 rounded-2" type="button" data-bs-toggle="collapse" data-bs-target="#searchTypeBar" aria-controls="searchTypeBar" aria-expanded="false" aria-label="Toggle navigation">
                    <img src="assets/images/downArrow.svg" title='Search Types' width={40} height={40} />
                </a>
                <div className="collapse navbar-collapse" id="searchTypeBar">
                    <ul className="navbar-nav">
                        {types.map((item, index) => (
                            <li key={item}
                                className={typeSelected == index ? "nav-item p-2 ps-3 pe-3 bg-dark-subtle fs-5" : "nav-item p-2 fs-5"}
                                onClick={(e) => { handleClick(e, index) }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default SearchType;