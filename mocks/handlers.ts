import { http, HttpResponse } from 'msw';

export const validGetDesignResponse = {
  'id': '32ae14e9e5d746808c92bd5c0de6038c',
  'sellerId': 'drukarnia-cmyk',
  'brandId': 'photo-shop',
  'productCode': 'drukarnia-cmyk-caketopper',
  'status': 'NEW',
  'thumbUrl': 'https://picsum.photos/200/200',
  'templateBindingType': 'caketopper',
  'templateId': 'fullOneImage',
  'productParameters': {
    'color': 'black',
  },
  'projectParameters': [
    {
      'id': 'yHyGj0bfe2',
      'volume': 6,
      'pages': {
        'id': '0',
        'templateId': 'fullOneImage',
      },
      'boxIds': [
        'puzzle4u-41-4',
      ],
    },
  ],
  'returnUrl': 'https://antigrodesigner.com/ABCD',
  'volume': 6,
  'orderId': 'CDE1234',
  'externalData': {
    'offerId': 'XYZ',
  },
  'printFileGenerationStatus': 'POSTPONED',
  'printFiles': [],
};
export const validPostDesignResponse = {
  'id': 'a039c676098311ec9a030242ac130003',
  'thumbUrl': 'https://picsum.photos/200/200',
};
export const validPatchDesignResponse = {
  status: 'ok',
};

export const handlers = [
  http.get(`https://designer.antigro.com/api/partner-backend/designs/*`, () => {
    return HttpResponse.json(validGetDesignResponse);
  }),
  http.get(
    `https://designer-test.antigro.com/api/partner-backend/designs/*`,
    () => {
      return HttpResponse.json(validGetDesignResponse);
    },
  ),

  //
  http.post(`https://designer.antigro.com/api/partner-backend/designs`, () => {
    return HttpResponse.json(validPostDesignResponse);
  }),
  http.post(
    `https://designer-test.antigro.com/api/partner-backend/designs`,
    () => {
      return HttpResponse.json(validPostDesignResponse);
    },
  ),

  //
  http.patch(`https://designer.antigro.com/api/partner-backend/designs/*`, () => {
    return HttpResponse.json(validPatchDesignResponse);
  }),
  http.patch(
    `https://designer-test.antigro.com/api/partner-backend/designs/*`,
    () => {
      return HttpResponse.json(validPatchDesignResponse);
    },
  ),
];