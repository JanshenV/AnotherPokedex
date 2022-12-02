//Styles
import styles from "./Header.module.scss";

//Libs
import classNames from "classnames";

//Icons
import LightModeSolrock from "assets/solrockMode.png";
import DarkModeLunatone from "assets/lunatoneMode.png";

//React
import { useState, useEffect } from "react";
// import CustomSnackBar from "components/MUISnackBar";

export default function Header({ }) {
    const screenWidth = window.innerWidth;

    const [focus, setFocus] = useState({
        on: true,
        message: screenWidth > 500 ? "If Pokémon not found, press button to search" : 'Press "Search" button',
    });
    const [mode, setMode] = useState("");
    const [searchInput, setSearchInput] = useState('');

    // function handleFocus(on: boolean): void {
    //     setFocus({ ...focus, on });
    // }

    function handleDefaultMode(): void {
        let localStorageMode: string | null = localStorage.getItem("mode");

        if (!localStorageMode) {
            localStorageMode = "light";
        }

        setMode(localStorageMode);
        localStorage.setItem("mode", localStorageMode);
    }

    function handleMode(): void {
        let localMode = mode === "light" ? "dark" : "light";
        setMode(localMode);
        localStorage.setItem("mode", localMode);
    }

    useEffect(() => {
        handleDefaultMode();
    }, []);

    return (
        <header
            className={classNames({
                [styles.container]: true,
                [styles["container__lightBackground"]]: mode === "light",
                [styles["container__darkBackground"]]: mode === "dark",
            })}>
            {/* {
                <CustomSnackBar
                    focus={focus}
                    className={styles.container__focusMessage}
                    vertical="top"
                    horizontal="center"
                />
            } */}

            <div
                className={classNames({
                    [styles.container__leftSideArea]: true,
                    [styles['container__leftSideArea--ultraBall']]: mode === 'dark'
                })}>

                <input
                    type="text"
                // onFocus={() => focus.on && setInterval(handleFocus, 3000, false)}
                // onClick={() => handleFocus(true)}
                />

                <button className={
                    classNames({
                        [styles['container__leftSideArea__searchButton']]: true,
                        [styles['container__leftSideArea__searchButton--lightButton']]: mode === 'light',
                        [styles['container__leftSideArea__searchButton--darkButton']]: mode === 'dark',
                    })
                }>
                </button>
            </div>

            <div className={classNames({
                [styles.container__rightSideArea]: true
            })}>
                <img
                    className={classNames({
                        [styles['container__rightSideArea--logo']]: true
                    })}
                    src={mode === "light" ? LightModeSolrock : DarkModeLunatone}
                    alt="Icon Mode"
                    onClick={handleMode}
                />


            </div>

        </header>
    );
}
