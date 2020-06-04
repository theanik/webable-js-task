<template>
<ul class="pagination justify-content-center">
    <li class="page-item" v-for="(pages,index) in totalPages" :class="currentPage == pages ? 'active' : ''">
    <a class="page-link" @click="changePage(pages)">{{pages}}</a>
    </li>
</ul>
</template>

<script>
    export default {
        name : 'paginate',
        props:['totalPages','totalData'],
        data() {
            return {
                limit : 20,
                currentPage : 1,
            }
        },
        methods: {
            changePage:function(page) {
                console.log(page)
                this.currentPage = page;
                this.$parent.getData(page);
              },
              clickCallback: function(pageNum) {
                console.log(pageNum)
              }
        }
    }
</script>