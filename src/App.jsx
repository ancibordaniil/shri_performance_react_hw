import { useState, useRef, useCallback } from "react";
import Header from "./components/Header/Header";
import Event from "./components/Event/Event";

const TABS = {
    all: {
        title: "Все",
        items: [
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Yeelight LED Smart Bulb", subtitle: "Включено" },
            { icon: "light", iconLabel: "Освещение", title: "D-Link Omna 180 Cam", subtitle: "Включится в 17:00" },
            { icon: "temp", iconLabel: "Температура", title: "Elgato Eve Degree Connected", subtitle: "Выключено до 17:00" },
            { icon: "light", iconLabel: "Освещение", title: "LIFX Mini Day & Dusk A60 E27", subtitle: "Включится в 17:00" },
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
            { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Включено" },
            { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Включено" },
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
        ],
    },
    kitchen: {
        title: "Кухня",
        items: [
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Yeelight LED Smart Bulb", subtitle: "Включено" },
            { icon: "temp", iconLabel: "Температура", title: "Elgato Eve Degree Connected", subtitle: "Выключено до 17:00" },
        ],
    },
    hall: {
        title: "Зал",
        items: [
            { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Выключено" },
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Выключено" },
        ],
    },
    lights: {
        title: "Лампочки",
        items: [
            { icon: "light", iconLabel: "Освещение", title: "D-Link Omna 180 Cam", subtitle: "Включится в 17:00" },
            { icon: "light", iconLabel: "Освещение", title: "LIFX Mini Day & Dusk A60 E27", subtitle: "Включится в 17:00" },
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
            { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Включено" },
        ],
    },
    cameras: {
        title: "Камеры",
        items: [
            { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
        ],
    },
};

for (let i = 0; i < 6; i++) {
    TABS.all.items = [...TABS.all.items, ...TABS.all.items];
}

const TABS_KEYS = Object.keys(TABS);

const App = () => {
    const [activeTab, setActiveTab] = useState(() =>
        new URLSearchParams(window.location.search).get("tab") || "all"
    );
    const [hasRightScroll, setHasRightScroll] = useState(false);
    const panelRef = useRef();
    const sizesRef = useRef([]);

    const handleSize = useCallback((size) => {
        if (!panelRef.current) return;

        sizesRef.current.push(size);
        if (sizesRef.current.length === TABS[activeTab].items.length) {
            const sumWidth = sizesRef.current.reduce(
                (acc, item) => acc + item.width,
                0
            );
            setHasRightScroll(sumWidth > panelRef.current.offsetWidth);
        }
    }, [activeTab]);

    const handleArrowClick = () => {
        const scroller = panelRef.current?.querySelector(".section__panel");
        scroller?.scrollTo({
            left: scroller.scrollLeft + 400,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Header />
            <main className="main">
                <section className="section main__general">
                    <h2 className="section__title section__title-header section__main-title">
                        Главное
                    </h2>
                    <div className="hero-dashboard">
                        <div className="hero-dashboard__primary">
                            <h3 className="hero-dashboard__title">
                                Привет, Геннадий!
                            </h3>
                            <p className="hero-dashboard__subtitle">
                                Двери и окна закрыты, сигнализация включена.
                            </p>
                            <ul className="hero-dashboard__info">
                                <li className="hero-dashboard__item">
                                    <div className="hero-dashboard__item-title">Дома</div>
                                    <div className="hero-dashboard__item-details">
                                        +23<span className="a11y-hidden">°</span>
                                    </div>
                                </li>
                                <li className="hero-dashboard__item">
                                    <div className="hero-dashboard__item-title">За окном</div>
                                    <div className="hero-dashboard__item-details">
                                        +19<span className="a11y-hidden">°</span>
                                        <div
                                            className="hero-dashboard__icon hero-dashboard__icon_rain"
                                            role="img"
                                            aria-label="Дождь"
                                        ></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <ul className="hero-dashboard__schedule">
                            <Event icon="temp" iconLabel="Температура" title="Philips Cooler" subtitle="Начнет охлаждать в 16:30" />
                            <Event icon="light" iconLabel="Освещение" title="Xiaomi Yeelight LED Smart Bulb" subtitle="Включится в 17:00" />
                            <Event icon="light" iconLabel="Освещение" title="Xiaomi Yeelight LED Smart Bulb" subtitle="Включится в 17:00" />
                        </ul>
                    </div>
                </section>

                <section className="section main__scripts">
                    <h2 className="section__title section__title-header">Избранные сценарии</h2>
                    <ul className="event-grid">
                        <Event slim icon="light2" iconLabel="Освещение" title="Выключить весь свет в доме и во дворе" />
                        <Event slim icon="schedule" iconLabel="Расписание" title="Я ухожу" />
                        <Event slim icon="light2" iconLabel="Освещение" title="Включить свет в коридоре" />
                        <Event slim icon="temp2" iconLabel="Температура" title="Набрать горячую ванну" subtitle="Начнётся в 18:00" />
                        <Event slim icon="temp2" iconLabel="Температура" title="Сделать пол тёплым во всей квартире" />
                    </ul>
                </section>

                <section className="section main__devices">
                    <div className="section__title">
                        <h2 className="section__title-header">Избранные устройства</h2>
                        <select
                            className="section__select"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            {TABS_KEYS.map((key) => (
                                <option key={key} value={key}>
                                    {TABS[key].title}
                                </option>
                            ))}
                        </select>
                        <ul role="tablist" className="section__tabs">
                            {TABS_KEYS.map((key) => (
                                <li
                                    key={key}
                                    role="tab"
                                    aria-selected={key === activeTab}
                                    className={`section__tab ${key === activeTab ? "section__tab_active" : ""}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {TABS[key].title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="section__panel-wrapper" ref={panelRef}>
                        <div role="tabpanel" className="section__panel">
                            <ul className="section__panel-list">
                                {TABS[activeTab].items.map((item, index) => (
                                    <Event key={index} {...item} onSize={handleSize} />
                                ))}
                            </ul>
                        </div>
                        {hasRightScroll && (
                            <div className="section__arrow" onClick={handleArrowClick} />
                        )}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <ul className="footer__list">
                    <li className="footer__item"><a className="footer__link" href="/">Помощь</a></li>
                    <li className="footer__item"><a className="footer__link" href="/">Обратная связь</a></li>
                    <li className="footer__item"><a className="footer__link" href="/">Разработчикам</a></li>
                    <li className="footer__item"><a className="footer__link" href="/">Условия использования</a></li>
                </ul>
                <div className="footer__copyright">© 1997–2023 ООО «Яндекс»</div>
            </footer>
        </>
    );
};

export default App;
