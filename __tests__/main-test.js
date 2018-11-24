'use strict';

const main = require('../main/main');
const fixtures = require('../main/fixtures');
const parseQuantityFromBarcode = main.parseQuantityFromBarcode;
const parseBarcodeListToCodeAndQuantity = main.parseBarcodeListToCodeAndQuantity;
const getItemByBarcode = main.getItemByBarcode;
const getItemsAndTotalQuantityByBarcodes = main.getItemsAndTotalQuantityByBarcodes;
const getSubTotalWithBuyTwoGetOneFree = main.getSubTotalWithBuyTwoGetOneFree;
const isPromotedItem = main.isPromotedItem;
const getSubTotalByPromotions = main.getSubTotalByPromotions;
const constructQuantityString = main.constructQuantityString;
const calculateTotalAndSave = main.calculateTotalAndSave;
const getReceiptInfoByItemsAndQuantity = main.getReceiptInfoByItemsAndQuantity;
const getReceiptByReceiptInfo = main.getReceiptByReceiptInfo;
const printReceipt = main.printReceipt;
const loadPromotions = fixtures.loadPromotions;

describe('parseQuantityFromBarcode', () => {
  let standardBarcode = 'ITEM000000';
  let weightedBarcode = 'ITEM000000-2';
  let weightedDecimalBarcode = 'ITEM000001-22.7';

  it ('Given a standard barcode when pass to parseQuantityFromBarcode(), then return quantity as 1.', () => {
    expect(parseQuantityFromBarcode(standardBarcode)).toBe(1);
  });

  it ('Given a weighted barcode when pass to parseQuantityFromBarcode(), then return quantity as the proper weight.', () => {
    expect(parseQuantityFromBarcode(weightedBarcode)).toBe(2);
  });

  it ('Given a weighted decimal barcode when pass to parseQuantityFromBarcode(), then return quantity as the proper weight.', () => {
    expect(parseQuantityFromBarcode(weightedDecimalBarcode)).toBe(22.7);
  });
});

describe('parseBarcodeListToCodeAndQuantity', () => {
  let input_1 = ['ITEM000000', 'ITEM000000', 'ITEM000001'];
  let input_2 = ['ITEM000000', 'ITEM000000-5.3', 'ITEM000001-2.0', 'ITEM000003-2.7'];

  it ('Given a barcode list as [\'ITEM000000\', \'ITEM000000\', \'ITEM000001\'] when pass to parseBarcodeListToCodeAndQuantity(), then should return a map containing corresponding quantities of each item.', () => {
    expect(parseBarcodeListToCodeAndQuantity(input_1)).toEqual({'ITEM000000': 2, 'ITEM000001': 1});
  });

  it ('Given a barcode list as [\'ITEM000000\', \'ITEITEM000000-5.3\', \'ITEM000001-2.0\', \'ITEM000003-2.7\'] when pass to parseBarcodeListToCodeAndQuantity(), then should return a map containing corresponding quantities of each item.', () => {
    expect(parseBarcodeListToCodeAndQuantity(input_2)).toEqual({'ITEM000000': 6.3, 'ITEM000001': 2, 'ITEM000003': 2.7});
  });
});

describe('getItemByBarcode', () => {
  let input_1 = 'ITEM000000';

  let expected_output_1 = {
                            barcode: 'ITEM000000',
                            name: 'Coca-Cola',
                            unit: 'bottle',
                            price: 3.00
                          };

  it ('Given a standard barcode when pass to getItemByBarcode(), then should return correct item accroding to the getItemByBarcode.', () => {
    expect(getItemByBarcode(input_1)).toEqual(expected_output_1);
  });
});

describe('getItemsAndTotalQuantityByBarcodes', () => {
  let input_1 = ['ITEM000000'];
  let input_2 = [
                  'ITEM000001',
                  'ITEM000001',
                  'ITEM000001',
                  'ITEM000001',
                  'ITEM000001',
                  'ITEM000002',
                  'ITEM000002',
                  'ITEM000002-1.3',
                  'ITEM000005-2',
                ];

  let expected_output_1 = [
                            {
                              item: {
                                      barcode: 'ITEM000000',
                                      name: 'Coca-Cola',
                                      unit: 'bottle',
                                      price: 3.00
                                    },
                              quantity: 1
                            }
                          ];

  let expected_output_2 = [
                            {
                              item: {
                                      barcode: 'ITEM000001',
                                      name: 'Sprite',
                                      unit: 'bottle',
                                      price: 3.00
                                    },
                              quantity: 5
                            },
                            {
                              item: {
                                      barcode: 'ITEM000002',
                                      name: 'Apple',
                                      unit: 'kg',
                                      price: 5.50
                                    },
                              quantity: 3.3
                            },
                            {
                              item: {
                                      barcode: 'ITEM000005',
                                      name: 'Noodles',
                                      unit: 'bag',
                                      price: 4.50
                                    },
                              quantity: 2
                            },
                          ];

  it ('Given a barcode of item when pass to getItemsAndTotalQuantityByBarcodes(), then return the item info with quantity as 1', () => {
    expect(getItemsAndTotalQuantityByBarcodes(input_1)).toEqual(expected_output_1);
  });

  it ('Given a barcode list of items when pass to getItemsAndTotalQuantityByBarcodes(), then return those item info with corresponding quantity', () => {
    expect(getItemsAndTotalQuantityByBarcodes(input_2)).toEqual(expected_output_2);
  });
});

describe('getSubTotalWithBuyTwoGetOneFree', () => {
  let item = {
              barcode: 'ITEM000000',
              name: 'Coca-Cola',
              unit: 'bottle',
              price: 3.00
             };

  it ('Given an item and the quantity of it when pass to getSubTotalWithBuyTwoGetOneFree(), then return its subtotal price under buy two get one free promotion.', () => {
    expect(getSubTotalWithBuyTwoGetOneFree(item, 10)).toBe(21);
  });
});

describe('isPromotedItem', () => {
  let promotedItem = {
                      barcode: 'ITEM000000',
                      name: 'Coca-Cola',
                      unit: 'bottle',
                      price: 3.00
                    };
  let notPrmotedItem = {
                        barcode: 'ITEM000004',
                        name: 'Battery',
                        unit: 'box',
                        price: 2.00
                       };

  it ('Given a promoted item when pass to isPromotedItem(), then return true.', () => {
    expect(isPromotedItem(promotedItem, loadPromotions()[0].barcodes)).toBe(true);
  });

  it ('Given a not promoted item when pass to isPromotedItem(), then return false.', () => {
    expect(isPromotedItem(notPrmotedItem, loadPromotions()[0].barcodes)).toBe(false);
  });  
});

describe('getSubTotalByPromotions', () => {
  let promotedItem = {
                      barcode: 'ITEM000000',
                      name: 'Coca-Cola',
                      unit: 'bottle',
                      price: 3.00
                    };
  let notPrmotedItem = {
                        barcode: 'ITEM000004',
                        name: 'Battery',
                        unit: 'box',
                        price: 2.00
                       };

  it ('Given a promoted item when pass to getSubTotalByPromotions(), then return its subtotal price under promotion.', () => {
    expect(getSubTotalByPromotions(promotedItem, 10)).toBe(21);
  });

  it ('Given a not promoted item when pass to getSubTotalByPromotions(), then return its subtotal price under promotion.', () => {
    expect(getSubTotalByPromotions(notPrmotedItem, 10)).toBe(20);
  });  
})

describe('getSubTotalByPromotions', () => {
  it ('Given a countable unit and quantity as 1 when pass to getSubTotalByPromotions(), then return the quantity string without s', () => {
    expect(constructQuantityString(1.00, 'bottle')).toBe('1 bottle');
  });

  it ('Given a countable unit and quantity as 3 when pass to getSubTotalByPromotions(), then return the quantity string with s', () => {
    expect(constructQuantityString(3, 'bottle')).toBe('3 bottles');
  });

  it ('Given unit as box and quantity as 3 when pass to getSubTotalByPromotions(), then return the quantity string with es', () => {
    expect(constructQuantityString(3, 'box')).toBe('3 boxes');
  });

  it ('Given an uncountable unit and quantity as 1 when pass to getSubTotalByPromotions(), then return the quantity string without s', () => {
    expect(constructQuantityString(1, 'kg')).toBe('1 kg');
  });

  it ('Given an uncountable unit and quantity as 3.25 when pass to getSubTotalByPromotions(), then return the quantity string without s', () => {
    expect(constructQuantityString(3.25, 'kg')).toBe('3.25 kg');
  });
})

describe('calculateTotalAndSave', () => {
  let input_1 = [{
                          name: 'Sprite',
                          quantity: '6 bottles',
                          unitPrice: 3.00,
                          subTotal: 12.00
                        },
                        {
                          name: 'Apple',
                          quantity: '3.3 kg',
                          unitPrice: 5.50,
                          subTotal: 18.15
                        },
                        {
                          name: 'Noodles',
                          quantity: '2 bags',
                          unitPrice: 4.50,
                          subTotal: 9.00
                        }];

  it ('Given a list of items info and their subTotal when pass to calculateTotalAndSave(), then return the total and save accroding to the info', () => {
    expect(calculateTotalAndSave(input_1)).toEqual([39.15, 6.00]);
  });
});

describe('getReceiptInfoByItemsAndQuantity', () => {
  let expected_input_1 = [
                            {
                              item: {
                                      barcode: 'ITEM000001',
                                      name: 'Sprite',
                                      unit: 'bottle',
                                      price: 3.00
                                    },
                              quantity: 6
                            },
                            {
                              item: {
                                      barcode: 'ITEM000002',
                                      name: 'Apple',
                                      unit: 'kg',
                                      price: 5.50
                                    },
                              quantity: 3.3
                            },
                            {
                              item: {
                                      barcode: 'ITEM000005',
                                      name: 'Noodles',
                                      unit: 'bag',
                                      price: 4.50
                                    },
                              quantity: 2
                            },
                          ];
  let expected_output_1 = {
                            boughtItemsInfo: [{
                                                name: 'Sprite',
                                                quantity: '6 bottles',
                                                unitPrice: 3.00,
                                                subTotal: 12.00
                                              },
                                              {
                                                name: 'Apple',
                                                quantity: '3.3 kg',
                                                unitPrice: 5.50,
                                                subTotal: 18.15
                                              },
                                              {
                                                name: 'Noodles',
                                                quantity: '2 bags',
                                                unitPrice: 4.50,
                                                subTotal: 9.00
                                              }],
                            total: 39.15,
                            save: 6.00
                          };


  it ('Given a promoted item when pass to getReceiptInfoByItemsAndQuantity(), then return its subtotal price under promotion.', () => {
    expect(getReceiptInfoByItemsAndQuantity(expected_input_1)).toEqual(expected_output_1);
  });
})

describe('getReceiptByReceiptInfo', () => {
  let simpleReceiptInfo = {
                      boughtItemsInfo: [{
                                          name: 'Sprite',
                                          quantity: '6 bottles',
                                          unitPrice: 3.00,
                                          subTotal: 12.00
                                        }],
                      total: 12.00,
                      save: 6
                    };
  let complicatedReceiptInfo = {
                      boughtItemsInfo: [{
                                          name: 'Sprite',
                                          quantity: '6 bottles',
                                          unitPrice: 3.00,
                                          subTotal: 12.00
                                        },
                                        {
                                          name: 'Apple',
                                          quantity: '3.3 kg',
                                          unitPrice: 5.50,
                                          subTotal: 18.15
                                        },
                                        {
                                          name: 'Noodles',
                                          quantity: '2 bags',
                                          unitPrice: 4.50,
                                          subTotal: 9.00
                                        }],
                      total: 39.15,
                      save: 6.00
                    };

  let expected_receipt_string_1 = "***<store earning no money>Receipt ***\n";
     expected_receipt_string_1 += "Name: Sprite, Quantity: 6 bottles, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)\n";
     expected_receipt_string_1 += "----------------------\n";
     expected_receipt_string_1 += "Total: 12.00 (yuan)\n";
     expected_receipt_string_1 += "Saving: 6.00 (yuan)\n";

  let expected_receipt_string_2 = "***<store earning no money>Receipt ***\n";
     expected_receipt_string_2 += "Name: Sprite, Quantity: 6 bottles, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)\n";
     expected_receipt_string_2 += "Name: Apple, Quantity: 3.3 kg, Unit price: 5.50 (yuan), Subtotal: 18.15 (yuan)\n";
     expected_receipt_string_2 += "Name: Noodles, Quantity: 2 bags, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)\n";
     expected_receipt_string_2 += "----------------------\n";
     expected_receipt_string_2 += "Total: 39.15 (yuan)\n";
     expected_receipt_string_2 += "Saving: 6.00 (yuan)\n";

  it ('Given a receipt info with only one item when pass to getReceiptByReceiptInfo(), then return the correct receipt string.', () => {
    expect(getReceiptByReceiptInfo(simpleReceiptInfo)).toEqual(expected_receipt_string_1);
  });

  it ('Given a receipt info with multiple items when pass to getReceiptByReceiptInfo(), then return the correct receipt string.', () => {
    expect(getReceiptByReceiptInfo(complicatedReceiptInfo)).toEqual(expected_receipt_string_2);
  });
})

describe('printReceipt', () => {
  let boughtItemsCodeListWithOnlyOneCode = ['ITEM000000'];
  let boughtItemsCodeListWithMultipleCodes = ['ITEM000005', 'ITEM000005', 'ITEM000005', 'ITEM000005'];
  let boughtItemsCodeListWithWeightedCode = ['ITEM000001-6', 'ITEM000004', 'ITEM000004', 'ITEM000005'];

  let expected_receipt_string_1 = "***<store earning no money>Receipt ***\n";
     expected_receipt_string_1 += "Name: Coca-Cola, Quantity: 1 bottle, Unit price: 3.00 (yuan), Subtotal: 3.00 (yuan)\n";
     expected_receipt_string_1 += "----------------------\n";
     expected_receipt_string_1 += "Total: 3.00 (yuan)\n";
     expected_receipt_string_1 += "Saving: 0.00 (yuan)\n";

  let expected_receipt_string_2 = "***<store earning no money>Receipt ***\n";
     expected_receipt_string_2 += "Name: Noodles, Quantity: 4 bags, Unit price: 4.50 (yuan), Subtotal: 13.50 (yuan)\n";
     expected_receipt_string_2 += "----------------------\n";
     expected_receipt_string_2 += "Total: 13.50 (yuan)\n";
     expected_receipt_string_2 += "Saving: 4.50 (yuan)\n";

  let expected_receipt_string_3 = "***<store earning no money>Receipt ***\n";
     expected_receipt_string_3 += "Name: Sprite, Quantity: 6 bottles, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)\n";
     expected_receipt_string_3 += "Name: Battery, Quantity: 2 boxes, Unit price: 2.00 (yuan), Subtotal: 4.00 (yuan)\n";
     expected_receipt_string_3 += "Name: Noodles, Quantity: 1 bag, Unit price: 4.50 (yuan), Subtotal: 4.50 (yuan)\n";
     expected_receipt_string_3 += "----------------------\n";
     expected_receipt_string_3 += "Total: 20.50 (yuan)\n";
     expected_receipt_string_3 += "Saving: 6.00 (yuan)\n";

  it ('Given a barcode list with only one item when pass to printReceipt(), then return the correct receipt string.', () => {
    expect(printReceipt(boughtItemsCodeListWithOnlyOneCode)).toEqual(expected_receipt_string_1);
  });

  it ('Given a receipt info with multiple items when pass to getReceiptByReceiptInfo(), then return the correct receipt string.', () => {
    expect(printReceipt(boughtItemsCodeListWithMultipleCodes)).toEqual(expected_receipt_string_2);
  });

  it ('Given a receipt info with multiple items containing weighted code when pass to getReceiptByReceiptInfo(), then return the correct receipt string.', () => {
    expect(printReceipt(boughtItemsCodeListWithWeightedCode)).toEqual(expected_receipt_string_3);
  });
})