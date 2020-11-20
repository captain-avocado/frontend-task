<template>
  <div class="wrapper">
    <div class="title">Таблица ключей</div>
    <div class="table-container">
      <div class="table-row" v-for="keyword in filteredKeywords" :key="keyword.keyword">
        <div class="table-col" style="min-width: 400px; white-space: nowrap;">
          {{ keyword.keyword }}
        </div>
        <div class="table-col">
          {{ keyword.volume }}
        </div>
        <div class="table-col">
          {{ keyword.rank }}
        </div>
        <div class="table-col">
          <div 
            v-if="keyword.isAdded"
            class="button -red"
            @click="deleteKeyword(keyword.keyword)"
          >
            Удалить
          </div>
          <div 
            v-else
            class="button" 
            @click="addKeyword(keyword.keyword)"
          >
            Добавить
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-row">
      <div class="button" @click="loadPage(activePage - 1)">Назад</div>
      <div class="pages">
        <div class="page" v-for="page in $store.state.keywords.pagesAmount" :key="page" @click="loadPage(page)" :class="{ '-active': page === activePage }">{{ page }}</div>
      </div>
      <div class="button" @click="loadPage(activePage + 1)">Вперед</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeywordsTable',

  data() {
    return {
      filteredKeywords: [],
      pagesAmount: 1,
      activePage: 1
    };
  },

  async mounted() {
    await this.$store.dispatch('keywords/getKeywords', 1);
    this.filterKeywordsValues();
  },

  methods: {
    async loadPage(page) {
      this.activePage = page;
      await this.$store.dispatch('keywords/getKeywords', this.activePage);
      this.filterKeywordsValues();
    },

    addKeyword(keyword) {
      this.$store.dispatch('keywords/addKeyword', keyword);
      this.filteredKeywords = this.filteredKeywords.map(currentKeyword => ({
        ...currentKeyword,
        isAdded: currentKeyword.keyword === keyword ? true : currentKeyword.isAdded
      }));
    },

    deleteKeyword(keyword) {
      this.$store.dispatch('keywords/deleteKeyword', keyword);
      this.filteredKeywords = this.filteredKeywords.map(currentKeyword => ({
        ...currentKeyword,
        isAdded: currentKeyword.keyword === keyword ? false : currentKeyword.isAdded
      }));
    },

    filterKeywordsValues() {
      this.filteredKeywords = this.$store.state.keywords.keywords.map(keyword => ({
        ...keyword,
        volume: keyword.volume ? keyword.volume : '-',
        rank: keyword.rank ? keyword.rank : '-'
      }));
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 800px;
  margin: 100px auto;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 10px 5px;

  &:nth-child(2n + 1) {
    background: #f1f1f5;
  }
}

.table-col {
  flex: 1;
}

.bottom-row {
  margin-top: 24px;
  display: flex;
  align-items: center;
}

.pages {
  margin: 0 10px;
  display: flex;
}

.page {
  padding: 4px 6px;
  margin: 0 2px;
  border-radius: 2px;
  cursor: pointer;

  &:hover, &.-active {
    background-color: #f1f1f5;
  }
}

.button {
  padding: 8px;
  border-radius: 8px;
  background: #29a463;
  color: #fafafa;
  cursor: pointer;
  display: inline-block;

  &.-red {
    background-color: #fc5e75;
  }
}
</style>
