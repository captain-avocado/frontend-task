import { sleep } from '@/utils/sleep';
import { isErrorOn } from '@/utils/config';
import requestMock from '@/assets/request-mock.json';

export const store = {
  state: {
    keywords: [],
    pagesAmount: 1
  },

  actions: {
    async getKeywords({ commit }, page) {
      const data = await getKeywordsFromJSON(page);
      commit('setKeywords', data);
    },

    async addKeyword(keyword) {
      try {
        await addKeywordFromJSON(keyword);
      } catch(e) {
        return {
          error: e,
          payload: null
        };
      }
    },

    async deleteKeyword(keyword) {
      try {
        await deleteKeywordFromJSON(keyword);
      } catch(e) {
        return {
          error: e,
          payload: null
        };
      }
    }
  },

  mutations: {
    setKeywords(state, { keywords, pagesAmount }) {
      state.keywords = keywords;
      state.pagesAmount = pagesAmount;
    }
  },

  namespaced: true
};

async function getKeywordsFromJSON(page) {
  const { keywords, pagesAmount } = requestMock;
  await sleep(1500);
  if (isErrorOn && Math.random() < 0.7) {
    console.log('Error: keywords are not received');
    throw Error('Internal Server Error');
  }
  console.log('Success: keywords are received');
  return { 
    keywords: keywords.filter(keyword => keyword.page === page),
    pagesAmount
  };
}

async function addKeywordFromJSON(keyword) {
  await sleep(1500);
  if (isErrorOn && Math.random() < 0.7) {
    console.log('Error: keyword is not added');
    throw Error('Internal Server Error');
  }
  console.log('Success: keyword is added');
  return { 
    keyword
  };
}

async function deleteKeywordFromJSON(keyword) {
  await sleep(1500);
  if (isErrorOn && Math.random() < 0.7) {
    console.log('Error: keyword is not removed');
    throw Error('Internal Server Error');
  }
  console.log('Success: keyword is removed');
  return { 
    keyword
  };
}