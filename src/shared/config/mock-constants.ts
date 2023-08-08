import { Random } from 'mockjs'

// Изменить в зависимости от бэка
export const IMAGE_ENTITY_MOCK = {
  'id|+1': 1,
  name: 'test-file.png',
  originalName: 'test-file.png',
  'orderIndex|1-12': 1,
  path: 'https://dummyimage.com/900x600.png',
  pathS3: 'https://dummyimage.com/900x600.png',
  url: 'https://dummyimage.com/900x600.png',
  dateCreate: '2022-03-11T12:21:53.553Z',
  dateUpdate: '2022-03-11T12:21:53.553Z',
  loading: false,
}

export const IMAGE_ENTITY_MOCK_WITH_TEXT = {
  'id|+1': 1,
  name: 'test-file.png',
  originalName: 'test-file.png',
  'orderIndex|1-12': 1,
  //чтобы изображения отличались визуально
  pathS3: 'https://dummyimage.com/900x600.png&text=@title(1)',
  url: 'https://dummyimage.com/900x600.png&text=@title(1)',
  dateCreate: '2022-03-11T12:21:53.553Z',
  dateUpdate: '2022-03-11T12:21:53.553Z',
  loading: false,
}

export const FILE_ENTITY_MOCK = {
  'id|+1': 1,
  name: 'test-file.png',
  originalName: 'test-file.pdf',
  path: 'https://www.orimi.com/pdf-test.pdf',
  pathS3: 'https://www.orimi.com/pdf-test.pdf',
  url: 'https://www.orimi.com/pdf-test.pdf',
  dateCreate: '2022-03-11T12:21:53.553Z',
  dateUpdate: '2022-03-11T12:21:53.553Z',
  loading: false,
}

export const COLOR_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  hex: '4285F4',
  'models|10': [/\/models\/[0-9]/],
  'cars|10': [/\/autos\/[0-9]/],
  'type|0-1': 0,
}

export const MATERIAL_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  assetPath: Random.image(),
}

// TODO: Поправить, когда будет понятно по бэку
export const CAR_ENTITY_MOCK = {
  name: '@title(3)',
  'id|+1': 1,
  brand: {
    name: '@title(3)',
  },
  model: {
    name: '@title(2)',
  },
  configuration: '@title(3)',
  type: 0,
  'images|15': [IMAGE_ENTITY_MOCK_WITH_TEXT],
  year: 0,
  'ownersCount|0-100': 0,
  'mileage|0-1000000': 0,
  dealer: '@title(2)',
  price: {
    'value|0-10000000': 0,
    'rubValue|0-10000000': 0,
    currency: {
      name: '@title(2)',
    },
  },
  'prices|3': ['price|0-10000000'],
  vin: '@guid',
  location: {
    city: '@city',
    country: '@county',
  },
  manufacturer: {
    name: '@title(2)',
    location: {
      city: '@city',
      country: '@county',
    },
  },
  // TODO: сверить с бэком
  // additionalCharacteristics: string[],
  'literEngineVolume|1-9': 0,
  firstRegDate: '@date',
  dateOfManufacturer: '@date',
  // TODO: сверить с бэком
  // colors: string[],
  bodyType: '@title(1)',
  'colors|1-2': [COLOR_ENTITY_MOCK],
  'interiorColors|1-2': [COLOR_ENTITY_MOCK],
  'driveType|0-3': 0,
  'fuelType|0-6': 0,
  'transmissionType|0-3': 0,
  generation: '@title(2)',
  'enginePower|1-9': 0,
  'engineVolume|1-9': 0,
  'literengineVolume|1-9': 0,
  'ecoType|0-5': 0,
  interiorMaterials: '@title(2)',
  'additionalCharacteristics|3': ['string|0-10000000'],
  additionalInformation: '@title(20)',
}

export const PRODUCT_ENTITY_MOCK = {
  name: '@title(3)',
  'id|+1': 1,
  brand: {
    name: '@title(3)',
  },
  model: {
    name: '@title(2)',
  },
  configuration: '@title(3)',
  type: 0,
  'images|15': [IMAGE_ENTITY_MOCK_WITH_TEXT],
  year: 0,
  'ownersCount|0-100': 0,
  'mileage|0-1000000': 0,
  dealer: '@title(2)',
  price: {
    'value|0-10000000': 0,
    'rubValue|0-10000000': 0,
    currency: {
      name: '@title(2)',
    },
  },
  'prices|3': ['price|0-10000000'],
  vin: '@guid',
  location: {
    city: '@city',
    country: '@county',
  },
  manufacturer: {
    name: '@title(2)',
    location: {
      city: '@city',
      country: '@county',
    },
  },
  // TODO: сверить с бэком
  // additionalCharacteristics: string[],
  'literEngineVolume|1-9': 0,
  firstRegDate: '@date',
  dateOfManufacturer: '@date',
  // TODO: сверить с бэком
  // colors: string[],
  bodyType: '@title(1)',
  'colors|1-2': [COLOR_ENTITY_MOCK],
  'interiorColors|1-2': [COLOR_ENTITY_MOCK],
  'driveType|0-3': 0,
  'fuelType|0-6': 0,
  'transmissionType|0-3': 0,
  generation: '@title(2)',
  'enginePower|1-9': 0,
  'engineVolume|1-9': 0,
  'literengineVolume|1-9': 0,
  'ecoType|0-5': 0,
  interiorMaterials: '@title(2)',
  'additionalCharacteristics|3': ['string|0-10000000'],
  additionalInformation: '@title(20)',
}

export const CAR_FILTER_DATA_ENTITY_MOCK = {
  'price_min|0-5000': 0,
  'price_max|5001-10000': 0,
  'mileage_min|0-5000': 0,
  'mileage_max|5001-10000': 0,
  'owners_min|0-5000': 0,
  'owners_max|5001-10000': 0,
  'years_min|0-5000': 0,
  'years_max|5001-10000': 0,
  'enginePower_min|0-5000': 0,
  'enginePower_max|5001-10000': 0,
  'engineVolume_min|0-5000': 0,
  'engineVolume_max|5001-10000': 0,
}

export const BRAND_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  canonicalName: '@title(2)',
  'cars|10': [/\/autos\/[0-9]/],
  'models|10': [/\/models\/[0-9]/],
}
export const USER_DOCUMENT_MOCK = {
  firstName: '@title(1)',
  middleName: '@title(1)',
  lastName: '@title(1)',
  dateBirthday: '@date',
  seriesAndNumber: '@title(1)',
  dateIssue: '@date',
  agency: '@title(1)',
  'divisionCode|0-10': 0,
  snils: '@title(1)',
  inn: '@title(1)',
  registerCity: '@title(1)',
  registerCountry: '@title(1)',
  registerProvince: '@title(1)',
  registerAddress: '@title(1)',
  registerDate: '@date',
  registerPostalCode: '@title(1)',
}

export const MODEL_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  canonicalName: '@title(2)',
  brand: /\/brands\/[0-9]/,
  'cars|10': [/\/autos\/[0-9]/],
  'configurations|10': [/\/configurations\/[0-9]/],
  'colors|10': [/\/colors\/[0-9]/],
  'bodyTypes|10': [/\/body_types\/[0-9]/],
}

export const GENERATION_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  canonicalName: '@title(2)',
  model: /\/models\/[0-9]/,
}

export const CONFIGURATION_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  'cars|10': [/\/autos\/[0-9]/],
  model: /\/models\/[0-9]/,
}

export const BODY_TYPE_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  icon: IMAGE_ENTITY_MOCK,
  'models|10': [/\/models\/[0-9]/],
  'cars|10': [/\/autos\/[0-9]/],
}

export const COUNTRIES_TYPE_ENTITY_MOCK = {
  address: [/\/address\/[0-9]/],
  internationalDeliveryPrice: [/\/internationalDeliveryPrice\/[0-9]/],
  name: '@county',
}

export const DEALER_TYPE_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  'cars|10': [/\/autos\/[0-9]/],
  address: /\/adresses\/[0-9]/,
}

export const MANUFACTURER_TYPE_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@title(2)',
  'cars|10': [/\/autos\/[0-9]/],
  location: /\/adresses\/[0-9]/,
}

export const ORDER_ENTITY_MOCK = {
  'id|+1': 1,
  user: /\/users\/[0-9]/,
  startDate: '@date',
  endDate: '@date',
  car: {
    'id|+1': 1,
  },
  'status|10-58': 0,
  // TODO: Изменить mock Step, когда с ней все будет ясно
  'steps|1-10': [/\/steps\/[0-9]/],
  'payments|1-10': [/\/payments\/[0-9]/],
  pay: '@boolean',
}

export const PAYMENT_ENTITY_MOCK = {
  'id|+1': 1,
  user: /\/users\/[0-9]/,
  order: /\/orders\/[0-9]/,
  // TODO: Изменить mock Step, когда с ней все будет ясно
  step: /\/steps\/[0-9]/,
  'total|1-100000': 1,
  currency: /\/currencies\/[0-9]/,
  'totalRub|1-100000': 1,
  exchangeRate: 0,
  'status|0-6': 0,
  startDate: '@date',
  externalId: 1,
  errorMessage: '@title(3)',
  paymentURL: '@url',
}

export const DELIVERY_ENTITY_MOCK = {
  'id|+1': 1,
  'carPrice|1-1000000': 0,
  customClearance: {
    'customClearanceFee|1-1000000': 0,
    'recyclingFee|1-1000000': 0,
    'exciseTax|1-1000000': 0,
    'customDuty|1-1000000': 0,
    'fullClearancePrice|1-1000000': 0,
  },
  delivery: {
    'internationalDelivery|1-1000000': 0,
    'domesticDelivery|1-1000000': 0,
  },
  'fullPrice|1-1000000': 0,
}

export const ORDER_CAR_ENTITY_MOCK = {
  'id|+1': 1,
  currentStep: {
    'id|+1': 1,
    'type|0-4': 0,
    dateStart: '@date',
    dateUpdate: '@date',
    currentStatus: {
      'status|10-58': 0,
      dateStart: '@date',
      dateUpdate: '@date',
    },
  },
  car: {
    name: '@title(4)',
    images: [IMAGE_ENTITY_MOCK],
    firstRegDate: '@date',
    'enginePower|1-9': 0,
    'literEngineVolume|1-9': 0,
  },
  dateStart: '@date',
  dateUpdate: '@date',
}

export const USER_ENTITY_MOCK = {
  'id|+1': 1,
  'isAgreementAccepted|1-2': true,
  firstName: '@first',
  lastName: '@word',
  middleName: '@word',
  fullName: '@word',
  'isRealEmail|1-2': true,
  username: '@word',
  'enabled|1-2': true,
  email: '@email',
  roles: ['@word'],
  phone: '89999999999',
  'isExternalUser|1-2': true,
  'isEmailConfirmed|1-2': true,
  'isPhoneConfirmed|1-2': true,
  telegram: '@word',
}

export const USER_NOTIFICATION_MOCK = {
  user: '@word',
  'sms|1-2': true,
  'email|1-2': true,
  'telegram|1-2': true,
}

export const FAVORITE_CAR_ENTITY_MOCK = {
  'id|+1': 1,
  user: USER_ENTITY_MOCK,
  car: CAR_ENTITY_MOCK,
}
