import { http, HttpResponse } from 'msw';

export const handlersErrors = [
  http.get(`https://designer.antigro.com/api/partner-backend/designs/*`, () => {
    return HttpResponse.error();
  }),
  http.get(
    `https://designer-test.antigro.com/api/partner-backend/designs/*`,
    () => {
      return HttpResponse.error();
    },
  ),

  //
  http.post(`https://designer.antigro.com/api/partner-backend/designs`, () => {
    return HttpResponse.error();
  }),
  http.post(
    `https://designer-test.antigro.com/api/partner-backend/designs`,
    () => {
      return HttpResponse.error();
    },
  ),

  //
  http.patch(`https://designer.antigro.com/api/partner-backend/designs/*`, () => {
    return HttpResponse.error();
  }),
  http.patch(
    `https://designer-test.antigro.com/api/partner-backend/designs/*`,
    () => {
      return HttpResponse.error();
    },
  ),
];
