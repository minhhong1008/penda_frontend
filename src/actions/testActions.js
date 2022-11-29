export const TEST_REQUEST = "TEST_REQUEST";
export const TEST_SUCCESS = "TEST_SUCCESS";
export const TEST_ERROR = "TEST_ERROR";

export const testActions = (payload) => {
    console.log('Actions run');
  return {
    type: TEST_REQUEST,
    payload: payload,
  };
};
