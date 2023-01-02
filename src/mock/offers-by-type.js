import { getRandomArrayElement } from '../utils.js';

const offersByType = [
  {
    type: 'flight',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20
      },
      {
        id: 2,
        title: 'Choose radiostation',
        price: 5
      }
    ]
  },
  {
    type: 'bus',
    offers:[]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 50
      },
      {
        id: 2,
        title: 'Add meal',
        price: 20
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 250
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 100
      },
      {
        id: 2,
        title: 'Add meal',
        price: 30
      },
      {
        id: 3,
        title: 'Vomiting pills',
        price: 10
      }
    ]
  },
  {
    type: 'restaurant',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 50
      },
      {
        id: 2,
        title: 'Lunch',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 50
      },
      {
        id: 2,
        title: 'Upgrade room',
        price: 500
      }
    ]
  }
];

function getOffersByType() {
  return offersByType;
}

function getRandomOfferByType() {
  return getRandomArrayElement(offersByType);
}

export {
  getOffersByType,
  getRandomOfferByType
};
