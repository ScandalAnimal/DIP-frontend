const initialState = {
  loading: false,
  error: false,
  customerInformation: {
    email: '',
    salutation: '',
    name: '',
    surname: '',
    middleName: '',
    nickName: '',
    day: '',
    month: '',
    year: '',
    country: '',
    street: '',
    number: '',
    zip: '',
    city: '',
    countryCode: '',
    phoneNumber: '',
  },
  driversLicense: {
    licenseNumber: '',
    issueDate: '',
    expirationDate: '',
    countryOfIssue: '',
  },
  vehicleInformation: {
    vin: '',
    handoverDate: '',
  },
  summary: {
    commissionNumber: '',
    preferredServicePartner: '',
    dataProcessingConsentAgreed: '',
    enrollmentConsentAgreed: '',
  },
};

export const registrationProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CUSTOMER_INFORMATION':
      return {
        ...state,
        customerInformation: {
          ...state['customerInformation'],
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_CUSTOMER_DATA_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'SET_CUSTOMER_DATA_SUCCESS':
      return {
        ...action.payload,
        loading: false,
        error: false,
      };
    case 'SET_CUSTOMER_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};
