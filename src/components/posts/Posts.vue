<template>
    <h2 class="title">Posts</h2>
    <Search />
    <div class="posts-items">
        <PostItem 
        v-for="post in filteredProducts" 
        :key="post.id" 
        :post_item="post"
        :comments="countComments(post.id)"
        />
    </div>

    <div class="pagination-block">
        <nav class="pagination">
            <button @click="setCurrentPage(-1)">PREV</button>
            
            <div class="pagination-list">
                <div v-for="p in totalPages" :key="p" class="pagination-item">
                    <a class="pagination-link" :class="{'is-current': currentPage == p}" @click="currentPage = p">{{p}}</a>
                </div>
            </div>
            <button @click="setCurrentPage(1)">NEXT</button>
        </nav>  
        <div class="pagination-info">
            Current page / max page: {{ currentPage }} / {{ totalPages }}
        </div>
    </div>

    <!-- <EmailChart :CommentsEmailLength="getCommentsEmailLength()" /> -->
    <canvas id="email-chart"></canvas>
</template>
<script>
import PostItem from './Post.vue';
import Search from '../search/Search.vue';
import {mapActions, mapGetters} from 'vuex';
import Chart from 'chart.js/auto'

export default {
    name: 'Posts',
    components: {
        PostItem,
        Search
    },
    data() {
        return {
            sortedPosts: [],
            currentPage: 1,
            perPage: 10,
        }
    },
    
    methods: {
        ...mapActions([
            'GET_POSTS_FROM_API',
            'GET_COMMENTS_FROM_API'
        ]),
        searchPost(value) {
            this.sortedPosts = [...this.POSTS];
            if(value) {
                this.sortedPosts = this.sortedPosts.filter(function(item) {
                    return item.title.toLowerCase().includes(value.toLowerCase())
                })
                this.currentPage = 1;
            } else {
                this.sortedPosts = this.POSTS;
            }
        },
        setCurrentPage(direction) {
            if (direction === -1 && this.currentPage > 1) {
                this.currentPage -= 1
            } else if (direction === 1 && this.currentPage < this.sortedPosts.length / this.perPage) {
                this.currentPage += 1
            }
        },
        countComments(id) {
            if(id in this.COMMENTS) {
                return this.COMMENTS[id].length;
            } else {
                return 0
            }
        },
        getCommentsEmailLength() {
            let array_el = [];

            this.COMMENTS.forEach(function(item) {
                item.forEach(function(el) {
                    if (el.email.length > 0){
                        let b = el.email.length;
                        if(b in array_el) {
                            array_el[b]++
                        } else {
                            array_el[b] = 1
                        }
                    }
                })
            });
            return array_el
        },
        createChart() {
            const ctx = document.getElementById('email-chart');
            const labels_name = [];
            const data_value = [];
            const d = this.getCommentsEmailLength();
            d.forEach(function(value, key) {
                labels_name.push(key);
                data_value.push(value)
            })
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels_name,
                    datasets: [
                        {
                            label: "Email count",
                            type: "bar",
                            data: data_value,
                            backgroundColor: "rgba(71, 183,132,.5)",
                            borderColor: "#47b784",
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            });
        },
    },
    watch: {
        SEARCH_VALUE() {
            this.searchPost(this.SEARCH_VALUE)
        },
    },
    async mounted() {
        this.GET_POSTS_FROM_API()
            .then((response) => {
                if(response.data) {
                    this.sortedPosts = response.data
                }
            })
        await this.GET_COMMENTS_FROM_API();
        this.createChart();
    },
    computed: {
        ...mapGetters([
            'POSTS',
            'COMMENTS',
            'SEARCH_VALUE'
        ]),
        filteredProducts() {
            return this.sortedPosts.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        },
        totalPages() {
            return Math.ceil(this.sortedPosts.length / this.perPage)
        },
        
    },
}


</script>
<style lang="scss">
    input {
        outline: none !important;
    }
    .pagination-block,
    .search-block {
        margin-bottom: 30px;
    }
    .pagination-link.is-current {
        color: red;
        font-weight: bold;
    }
    .pagination,
    .pagination-list {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pagination-item {
        padding: 5px;
        border: 1px solid lightgray;
        cursor: pointer;
        min-width: 30px;
        margin: 0 5px;
        text-align: center;
        border-radius: 4px;
    }
    .pagination-info {
        text-align: center;
        margin-top: 15px;
    }
</style>