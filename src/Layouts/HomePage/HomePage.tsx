import { Carousel } from "./components/Carousel";
import { Communication } from "./components/Communication";
import { Header } from "./components/Header";
import { Heros } from "./components/Heros";

export const HomePage = () => {
    return (
        <>
            <Header/>
            <Carousel/>
            <Heros/>
            <Communication/>
        </>
    );
}