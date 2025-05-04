const tg = window.Telegram.WebApp;

export function useTelegram() {
    
    const onClose = () => {
        tg.close();
    };

    const onToggleButton = () => {
        tg.MainButton.show();
    };

    const onMainButtonClick = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        }
        else {
            tg.MainButton.show();
        }
    };

    const onBackButtonClick = () => {
        tg.BackButton.onClick();
    };

    return { tg, onClose, onToggleButton, onMainButtonClick, onBackButtonClick, user:tg.initDataUnsafe?.user };
}