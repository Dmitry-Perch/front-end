const paginationApp = new Vue({
    el: '#pagination-app',
    data: {
        posts: [],
        baseUrl: 'https://www.reddit.com/r/subreddit/new.json?sort=new&limit=100',
        page: 1,
        perPage: 9,
        pages: [],

    },
    methods: {
        getPosts () {
            axios.get(this.baseUrl)
                .then(function (response) {
                    var normalPosts = [];

                    response.data.data.children.forEach(function (post) {
                        var postData = post.data;

                        normalPosts.push({
                            title: postData.title,
                            text: postData.selftext
                        });
                    });

                    this.posts = normalPosts.slice();
                }.bind(this))
            .catch(function (error) {
                console.log('Error on Authentication', error);
            });

        },
        setPages () {
            var numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (var index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (posts) {
            var page = this.page;
            var perPage = this.perPage;
            var from = (page * perPage) - perPage;
            var to = (page * perPage);
            return posts.slice(from, to);
        },
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        }
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        this.getPosts();
    }
});