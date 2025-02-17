import type { Page, Locator } from '@playwright/test';
import type { PageObject } from '@fixtures/PageObject';

export class CheckoutCartPage implements PageObject {
    public readonly headline: Locator;
    public readonly goToCheckoutButton: Locator;
    public readonly enterDiscountInput: Locator;
    public readonly grandTotalPrice: Locator;
    public readonly emptyCartAlert: Locator;
    public readonly stockReachedAlert: Locator;

    constructor(public readonly page: Page) {
        this.headline = page.getByRole('heading', { name: 'Shopping cart' });
        this.goToCheckoutButton = page.getByRole('link', { name: 'Go to checkout' });
        this.enterDiscountInput = page.getByLabel('Discount code');
        this.grandTotalPrice = page.locator('dt:has-text("Grand total") + dd');
        this.emptyCartAlert = page.getByText('Your shopping cart is empty.');
        this.stockReachedAlert = page.getByText('only available 1 times');
    }

    async goTo() {
        await this.page.goto('checkout/cart');
    }
}
