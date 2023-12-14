import { Item } from "./Item";

export class GildedRose {
  private maxQuality: number;
  private items: Array<Item>;

  constructor(items: Array<Item>, maxQuality: number = 50) {
    this.items = items;
    this.maxQuality = maxQuality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this.isSimpleItem(item)) {
        this.updateSimpleItem(item);
      }
      else if (this.isMaturing(item)) {
        this.updateMaturingItem(item);
      }
      else if (this.isTicket(item)) {
        this.updateTicketItem(item);
      }
    }

    return this.items;
  }

  private updateSellIn(item: Item) {
    if (!this.isLegendary(item)) {
      this.decrementSellIn(item);
    }
  }

  private updateSimpleItem(item: Item) {
    if (item.quality > 0) {
      this.decrementQuality(item);
    }

    this.updateSellIn(item);

    if (item.sellIn < 0 && item.quality > 0) {
      this.decrementQuality(item);
    }
  }

  private updateMaturingItem(item: Item) {
    if (this.isLessThanMaxQuality(item.quality)) {
      this.incrementQuality(item);
    }

    this.updateSellIn(item);

    if (item.sellIn < 0 && this.isLessThanMaxQuality(item.quality)) {
      this.incrementQuality(item);
    }
  }

  private updateTicketItem(item: Item) {

    if (item.quality >= this.maxQuality) return;
    this.incrementQuality(item);

    if (item.sellIn < 11 && item.quality < this.maxQuality) {
      this.incrementQuality(item);
    }

    if (item.sellIn < 6 && item.quality < this.maxQuality) {
      this.incrementQuality(item);
    }

    this.updateSellIn(item);

    if (item.sellIn < 0) {
      this.decrementQuality(item);
    }
  }

  private incrementQuality(item: Item) {
    item.quality = item.quality + 1;
  }

  private decrementQuality(item: Item) {
    item.quality = item.quality - 1;
  }

  private decrementSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private isSimpleItem(item: Item) {
    return (
      !this.isMaturing(item) && !this.isTicket(item) && !this.isLegendary(item)
    );
  }

  private isLessThanMaxQuality(quality: number) {
    return quality < this.maxQuality;
  }

  private isLegendary(item: Item): boolean {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  private isMaturing(item: Item): boolean {
    return item.name === "Aged Brie";
  }

  private isTicket(item: Item): boolean {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }
}
