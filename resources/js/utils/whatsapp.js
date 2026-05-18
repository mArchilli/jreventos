export const MAIN_WHATSAPP_NUMBER = '5491166383909';
export const PRODUCTS_WHATSAPP_NUMBER = '5491169614071';

export const MAIN_WHATSAPP_DISPLAY = '+54 9 11 6638-3909';
export const PRODUCTS_WHATSAPP_DISPLAY = '+54 9 11 6961-4071';

export function buildWhatsAppHref(number, message = '') {
    const text = message.trim();

    if (!text) {
        return `https://wa.me/${number}`;
    }

    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getMainWhatsAppHref(message = '') {
    return buildWhatsAppHref(MAIN_WHATSAPP_NUMBER, message);
}

export function getProductsWhatsAppHref(message = '') {
    return buildWhatsAppHref(PRODUCTS_WHATSAPP_NUMBER, message);
}

export function isProductsSectionComponent(component = '') {
    return component.startsWith('Client/Products/');
}

export function getSectionWhatsAppHref(component, { mainMessage = '', productsMessage = '' } = {}) {
    if (isProductsSectionComponent(component)) {
        return getProductsWhatsAppHref(productsMessage || mainMessage);
    }

    return getMainWhatsAppHref(mainMessage);
}

export function getSectionWhatsAppDisplay(component) {
    return isProductsSectionComponent(component)
        ? PRODUCTS_WHATSAPP_DISPLAY
        : MAIN_WHATSAPP_DISPLAY;
}
