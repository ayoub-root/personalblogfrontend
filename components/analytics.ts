import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize("G-T2Z2JSJG6G");
};

export const logPageView = () => {
    ReactGA.set({page: window.location.pathname});
    ReactGA.pageview(window.location.pathname);
};
