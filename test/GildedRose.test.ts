import { GildedRose } from "../src/GildedRose";
import { Item } from "../src/Item";

describe("Gilded rose tests", () => {
  it("should work", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      // new Item("Conjured Mana Cake", 3, 6),
    ];

    const gr = new GildedRose(items);

    const days: number = 2;
    for (let i = 0; i < days + 1; i++) {
      gr.updateQuality();
    }
    expect(items[0].quality).toEqual(17);
    expect(items[1].quality).toEqual(4);
    expect(items[2].quality).toEqual(4);
    expect(items[3].quality).toEqual(80);
    expect(items[4].quality).toEqual(80);
    expect(items[5].quality).toEqual(23);
    expect(items[6].quality).toEqual(50);
    expect(items[7].quality).toEqual(50);
    // expect(items[8].quality).toEqual(?);
  });
});
