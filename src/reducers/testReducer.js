import {
  TEST_ERROR,
  TEST_SUCCESS
} from '../actions/testActions.js'

const initialState = {
  test: 'Test value initialstate',
  message: ''
};

function testReducer(state = initialState, action) {
  switch (action.type) {
    case TEST_SUCCESS: {
      console.log('Reducer run: true')
      return {
        test: action.payload
      };
    }
    case TEST_ERROR: {
      console.log('Reducer run: false')
      return {
        message: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
}

export default testReducer;
