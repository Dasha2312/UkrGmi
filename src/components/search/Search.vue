<template>
    <div class="search-block">
        <input type="search" class="input-search" v-model="searchValue">
        <button type="button" @click="search(searchValue)">Search</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Search',
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {
        ...mapActions([
            'GET_SEARCH_VALUE'
        ]),
        search(value) {
            this.GET_SEARCH_VALUE(value);
        }
    },
    computed: {
        ...mapGetters([
            'SEARCH_VALUE'
        ])
    }
}
</script>
<style lang="">
    
</style>