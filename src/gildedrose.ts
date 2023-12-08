export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

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

      if (this.isSimpleItem(item) && item.quality > 0) {
        item.quality = item.quality - 1;
      } else {
        if (this.isLessThanMaxQuality(item.quality)) {
          item.quality = item.quality + 1;
          if (
            this.isTicket(item) &&
            item.sellIn < 11 &&
            this.isLessThanMaxQuality(item.quality)
          ) {
            item.quality = item.quality + 1;

            if (item.sellIn < 6 && this.isLessThanMaxQuality(item.quality)) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
      if (!this.isLegendary(item)) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!this.isMaturing(item)) {
          if (
            !this.isTicket(item) &&
            !this.isLegendary(item) &&
            item.quality > 0
          ) {
            item.quality = item.quality - 1;
          }

          if (this.isTicket(item)) {
            item.quality = item.quality - item.quality;
          }
        }

        else if (this.isLessThanMaxQuality(item.quality)) {
          item.quality = item.quality + 1;
        }
      }
    }

    return this.items;
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
