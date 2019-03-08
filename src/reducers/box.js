import * as types from "../constants/ActionTypes";

const itemsToFreqs = items => {
  return items.reduce(function(prev, curr) {
    const { product_id, product, id } = curr;
    if (product_id in prev) {
      prev[product_id].ids.push(id);
    } else {
      prev[product_id] = {
        product_id,
        product,
        ids: [id]
      };
    }
    return prev;
  }, {});
};

const freqsToItems = freqs => {
  const items = [];
  Object.keys(freqs).forEach(key => {
    const { product_id, product } = freqs[key];
    freqs[key].ids.forEach(id => {
      items.push({
        product_id,
        product,
        id
      });
    });
  });
  return items;
};

const initialState = {};

export default function box(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_BOX:
      return itemsToFreqs(action.items);
    case types.ADD_BOX_ITEM: {
      return itemsToFreqs([...freqsToItems(state), action.item]);
    }
    case types.REMOVE_BOX_ITEM: {
      return itemsToFreqs(
        freqsToItems(state).filter(item => item.id !== action.id)
      );
    }
    default:
      return state;
  }
}
