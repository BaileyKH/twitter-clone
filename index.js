const tweetsData = [   
    {
        handle: `@Hauntedblob`,
        profilePic: `assets/ghostprofile.webp`,
        likes: 27,
        retweets: 10,
        tweetText: `When you're all set to haunt someone but they're watching a horror movie and cheering for the ghost. #Awkward #RelatableGhostMoments`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@FullMoonGuy`,
        profilePic: `assets/werewolfprofile.webp`,
        likes: 6500,
        retweets: 234,
        tweetText: `Just tried to howl at the moon, but sneezed halfway through. Now the local wolves think I'm starting a new call. #WerewolfWoes`,
        replies: [
                  {
                handle: `@BldSkr1654`,
                profilePic: `assets/vampireprofile.webp`,
                tweetText: `Better than waking up with a sunburn because you forgot the curtains. Count your blessings`,
            },
                  {
                handle: `@Spellchick`,
                profilePic: `assets/witchprofile.webp`,
                tweetText: `Could be worse! Last time I sneezed during a spell, I turned my cat into a cactus. `,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@GraveyardGourmet`,
        profilePic: `assets/zombieprofile.webp`,
        likes: 10,
        retweets: 3,
        tweetText: `Lost an arm again while reaching for snacks. If anyone finds it, please return. It's the one holding a sandwich.`,
        replies: [
            {
                handle: `@Jack`,
                profilePic: `assets/pumpkinprofile.webp`,
                tweetText: `Heads up, if it knocks on my lid, I'm keeping the sandwich! 🎃`,
            },
            {
                handle: `@EchoNightFlyer`,
                profilePic: `assets/batprofile.webp`,
                tweetText: `Flew by it hanging from a tree branch. Thought it was a new type of fruit! I'll guide it back to you tonight`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]

const tweetInput = document.getElementById("tweet-input")

document.addEventListener("click", (e) => {
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick(e.target.dataset.tweetbtn)
    }
})

function handleLikeClick(tweetID) {
    const targetTweet = tweetsData.filter(function(tweets){
        return tweets.uuid === tweetID
    })[0]
    if (!targetTweet.isLiked){
        targetTweet.likes++
    } else {
        targetTweet.likes--
    }
    targetTweet.isLiked = !targetTweet.isLiked
    render()
}

function handleRetweetClick(tweetID) {
    const targetTweet = tweetsData.filter((tweets) => {
        return tweets.uuid === tweetID
    })[0]
    if (!targetTweet.isRetweeted){
        targetTweet.retweets++
    } else {
        targetTweet.retweets--
    }
    targetTweet.isRetweeted = !targetTweet.isRetweeted
    render()
}

function handleReplyClick(replyID){
    document.getElementById(`replies-${replyID}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    tweetsData.unshift({
        handle: `@SuperSickCoder`,
        profilePic: `assets/logo.webp`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: crypto.randomUUID(),
    })
    tweetInput.value = ""
    render()
}

function getFeedHtml() {
    let feedHtml = ``
    tweetsData.forEach((data) => {

        let likeIconClass = ''
        if (data.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''
        if (data.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''
        if (data.replies.length > 0){
            data.replies.forEach((reply) => {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="user-pic"/>
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                        </div>
                    </div>
                `
            })
        }

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${data.profilePic}" class="user-pic"/>
                    <div>
                        <p class="handle">${data.handle}</p>
                        <p class="tweet-text">${data.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail"><i class="fa-regular fa-comment-dots" data-reply="${data.uuid}"></i>${data.replies.length}</span>
                            <span class="tweet-detail"><i class="fa-solid fa-heart ${likeIconClass}" data-like="${data.uuid}"></i>${data.likes}</span>
                            <span class="tweet-detail"><i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${data.uuid}"></i>${data.retweets}</span>
                        </div>
                    </div>
                </div>
                <div class="hidden" id="replies-${data.uuid}">
                    ${repliesHtml}
                </div>
            </div>
        `
    })
    return feedHtml
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()

