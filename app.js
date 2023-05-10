const json = {
  videoBoardOld: { runtime: 1234, temperature: 98.9 },
  videoBoard: {
    runtime: { value: 16884 },
    temperature: { value: 88.90188856194294 },
  },
  coolingLoadOld: { temperature: 94.60252647842185 },
  coolingLoad: { temperature: { value: 94.60252647842185 } },
  fanOld: { left: 16884, right: 13.4 },
  fan: {
    left: {
      runtime: {
        value: 16884,
        avg: 13.4,
        max: 22,
        min: 13,
        startTS: "2020-05-05T17:20:50.702Z",
        currentTS: "2020-05-05T17:20:50.702Z",
      },
    },
    right: {
      runtime: {
        value: 16884,
        avg: 13.4,
        max: 22,
        min: 13,
        startTS: "2020-05-05T17:20:50.702Z",
        currentTS: "2020-05-05T17:20:50.702Z",
      },
    },
  },
  LastUpdated: "2020-05-05T17:20:50.702Z",
};
const keys = ["value", "avg", "max", "min", "startTS", "currentTS"];
function flattener(obj, keys) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      //checking if there is a nested object
      const flatObject = flattener(obj[key], keys); //used to traverse the nested object
      for (let flatKey in flatObject) {
        //to iterate over the keys of the returned object
        const flattenedKey = `${key}.${flatKey}`; //creating new flattened key
        if (keys.includes(flatKey)) {
          //checking if the key is available in list of keys, if yes, then we do not assign the flattened key
          acc[key] = obj[key]; //assign the original nested object
          continue;
        } else {
          acc[flattenedKey] = flatObject[flatKey]; //if the key is not found in the list of keys, then we assigned the value to the flattened key
        }
      }
    } else {
      acc[key] = obj[key]; //if not an object, then we simply assign it the key value pair
    }
    return acc;
  }, {});
}

console.log(flattener(json, keys)); //print output
