export default function(context) {
    const token = context.token;
    var blogblock = $('[data-blog-tag]'),
        tag;

    function getPosts() {
        let i = 0;

        const loadBlog = (i) => {
            tag = blogblock.eq(i).attr('data-blog-tag');

            getBlog(tag).then(data => {
                renderBlog(data.site.content.blog.posts.edges, tag);
                if (i+1 < blogblock.length) {
                    i++;
                    loadBlog(i);
                }
            });
        }
        loadBlog(i);
    }

    function getBlog(tag) {
        return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: `
            query MyQuery {
                site {
                    content {
                        blog {
                            name
                            description
                            path
                            posts (filters: {tags:["`+tag+`"]}) {
                                edges {
                                    node {
                                        entityId
                                        name
                                        tags
                                        htmlBody
                                        plainTextSummary (characterLimit: 100)
                                        author
                                        path
                                        thumbnailImage {
                                            url (width: 100, height: 200)
                                            urlOriginal
                                            altText
                                            isDefault
                                        }
                                        publishedDate {
                                            utc
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}),
    }).then(res => res.json())
        .then(res => res.data);
    }

    function formatUTCDate(utcDateString) {
        const date = new Date(utcDateString);
    
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
    
        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }
    
        const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    
        return `${dayWithSuffix} ${month} ${year}`;
    }
    
    function renderBlog(posts, tag) {
        $.each(posts, (index, element) => {
            if (index < 3) {
                var name = posts[index].node.name,
                    url = posts[index].node.path;

                let thumbnail = '',
                    summary = '',
                    author = '';

                if (posts[index].node.thumbnailImage != null) {
                    thumbnail = `<div class="item-image o-h b-r-32">
                                    <a class="halo-fadeZoom d-block b-r-32" href="${url}">
                                        <img src="${posts[index].node.thumbnailImage.urlOriginal}" alt="${name}">\
                                    </a>
                                </div>`;
                } else {
                    thumbnail = `<div class="item-image o-h b-r-32">
                                    <a class="halo-fadeZoom d-block b-r-32" href="${url}">
                                        <img src="https://cdn11.bigcommerce.com/s-yrxgwbtfrf/stencil/1128bad0-7ffd-013d-26e0-56dd6728db26/img/placeholder-electronic.svg" alt="${name}">\
                                    </a>
                                </div>`;
                }

                if (posts[index].node.plainTextSummary != null) {
                    summary = `<div class="summary f-root f-size-small-tb f-size-tiny-mb w-s-normal m-b-16 m-b-12-tb m-b-8-mb">${posts[index].node.plainTextSummary} &hellip;</div>`;
                }

                if (posts[index].node.author != null && posts[index].node.publishedDate != null) {
                    author = `<p class="date color-secondary f-root f-size-small-tb f-size-tiny-mb m-b-16 m-b-12-tb m-b-8-mb">Posted by ${posts[index].node.author} on ${formatUTCDate(posts[index].node.publishedDate.utc)}</p>`;
                }

                const html = `<div class="item bg-white b-r-12 d-flex a-i-center w-100 hover-zoom pos-relative" data-index="${index}">
                                <div class="content-left">
                                    ${thumbnail}
                                </div>
                                <div class="content-right halo-fadeInUp">
                                    <h5 class="name pos-relative m-t-0 m-b-16 m-b-12-tb m-b-8-mb"><a href="${url}">${name}</a></h5>
                                    ${author}
                                    ${summary}
                                    <a class="u-u u-p-u color-heading f-root f-size-small-tb f-size-tiny-mb" href="${url}">Read more</a>
                                </div>
                            </div>`

                $(`[data-blog-tag="${tag}"] .halo-block-content`).append(html);

                if (index + 1 == posts.length) {
                    $(`[data-blog-tag="${tag}"] .halo-block-content .loadingOverlay`).remove();
                    setTimeout(() => {
                        $(`[data-blog-tag="${tag}"] .halo-block-content .item`).addClass('animated');
                    }, 100);
                }
            } else {
                $(`[data-blog-tag="${tag}"] .halo-block-content .loadingOverlay`).remove();
                setTimeout(() => {
                    $(`[data-blog-tag="${tag}"] .halo-block-content .item`).addClass('animated');
                }, 100);
            }
        });
    }

    getPosts()
}
