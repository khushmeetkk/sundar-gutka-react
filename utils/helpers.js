/*
 * Constants
 */

export const defaultBaniOrderArray = Array(
  require("../config/defaultBaniOrder.json").baniOrder.length
)
  .fill()
  .map((x, i) => i);

export const mergedBaniList = baniList => {
  const defaultBani = require("../config/defaultBaniOrder.json");
  const mergedData = { baniOrder: [] };
  defaultBani.baniOrder.forEach(obj => {
    if (obj.id) {
      var baniItem = baniList[obj.id];
      if (baniItem) {
        mergedData.baniOrder.push({
          id: obj.id,
          gurmukhi: baniItem.gurmukhi,
          roman: baniItem.roman
        });
      }
    } else {
      var folder = [];
      obj.folder.forEach(item => {
        var baniItem = baniList[item.id];
        folder.push({
          id: item.id,
          gurmukhi: baniItem.gurmukhi,
          roman: baniItem.roman
        });
      });

      mergedData.baniOrder.push({
        gurmukhi: obj.gurmukhi,
        roman: obj.roman,
        folder
      });
    }
  });
  return mergedData;
};

export const TextType = Object.freeze({
  GURMUKHI: 0,
  TRANSLITERATION: 1,
  ENGLISH_TRANSLATION: 2
});

export const fontColorForReader = (header, nightMode, text) => {
  switch (text) {
    case TextType.GURMUKHI: {
      if (header === 1) {
        return "#00f";
      } else if (header === 2 || header === 6) {
        return nightMode ? "#c8c7cc" : "#464646";
      } else {
        return nightMode ? "#fff" : "#000";
      }
    }
    case TextType.TRANSLITERATION:
      return "#00f";
    case TextType.ENGLISH_TRANSLATION:
      return nightMode ? "#c8c7cc" : "#464646";
  }
};

export const fontSizeForList = SIZE => {
  switch (SIZE) {
    case "EXTRA_SMALL":
      return 16;
    case "SMALL":
      return 22;
    case "MEDIUM":
      return 28;
    case "LARGE":
      return 34;
    case "EXTRA_LARGE":
      return 46;
  }
};

export const fontSizeForReader = (SIZE, header) => {
  if (header === 6) {
    return fontSizeForList(SIZE) * 0.75;
  } else if (header === 2) {
    return fontSizeForList(SIZE) * 1.1;
  } else if (header === 1) {
    return fontSizeForList(SIZE) * 1.2;
  } else {
    return fontSizeForList(SIZE);
  }
};
