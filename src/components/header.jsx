import { useState } from "react"

export default function Header({onSearch, theme}){

    const [popover, setPopover] = useState(false)
    const [stateTheme, setStateTheme] = useState(false)
    const [font, setFont] = useState('Sans Serif')
    const [letter, setLetter] = useState('')

    const viewPopover = () =>{
        setPopover(!popover);
    }

    const changeFont = (e) =>{
        setFont(e.target.textContent)
    }
    const changeTheme = () =>{
        setStateTheme(!stateTheme)
        theme(stateTheme)
    }
    const searchApi = (e) =>{
        e.preventDefault()
        onSearch(letter)
    }
    return(
        <header className={`container-header ${stateTheme? 'container-header-dark': ''}`}>
            <div className="settings">
                <a href="main">
                    <span className="content-logo">
                        {stateTheme?<svg xmlns="http://www.w3.org/2000/svg" width="42" height="46" className="logo" viewBox="0 0 34 38"><g fill="none" fill-rule="evenodd" stroke="#A445ED" stroke-linecap="round" stroke-width="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="42" height="46" className="logo" viewBox="0 0 34 38"><g fill="none" fill-rule="evenodd" stroke="#838383" stroke-linecap="round" stroke-width="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg>}
                    </span>
                </a>
                <div className="container-select-toggle">
                    <div className="content-select" onClick={viewPopover}>
                        <div className="select">
                            <p>{font}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"><path fill="none" stroke="#A445ED" stroke-width="1.5" d="m1 1 6 6 6-6"/></svg>
                        </div>
                        <div className={`select__popover-desactive ${popover ? 'select__popover-active' : ''} ${stateTheme ? 'select__popover-desactive-dark' : 'select__popover-desactive'}`}>
                            <ol>
                                <li onClick={changeFont}>Sans Serif</li>
                                <li onClick={changeFont}>Serif</li>
                                <li onClick={changeFont}>Mono</li>
                            </ol>
                        </div>
                    </div>
                    <div className="toggle" onClick={changeTheme}>
                        <div className={`toggle__slider-left ${stateTheme ? 'toggle__slider-right' : ""}`} >
                            <div className="toggle__slider-circle"></div>
                        </div>
                        <div className="toggle__label">
                            {stateTheme?<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke={stateTheme ? '#A445ED':'#838383'} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg> :<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>}
                        </div>
                    </div>
                </div>
            </div>
            <form className="content-search" onSubmit={searchApi}>
                <div className="search">
                    <input type="text" className={`search-input ${stateTheme?"search-input-dark":""}`} placeholder="Search for any word..." onChange={(e) => setLetter(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18" ><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
                </div>
            </form>
        </header>
    )
}