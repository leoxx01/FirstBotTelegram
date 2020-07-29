const Youtube = require('youtube-node')
const config = require('./youtubeconfig.json')

const youtube = new Youtube()
youtube.setKey(config.key)
const urlVideo = (msg, queryText)=>{
   
    return new Promise((resolved, reject)=>{
        youtube.search(`Vinicius13 `,2, (err, data)=>{
            console.log(queryText)
            if(!err){
                console.log(JSON.stringify(data,null,2))
                //Revisar essa linha
                const videosIds = data.items.map((item)=> item.id.videoId).filter(item=>item)
                const youtubeLink = videosIds.map(videoId=>`https://www.youtube.com/watch?v=${videoId}`)
                resolved(`${message} ${youtubeLink.join(`, `)}`)
            }else{
                reject()
                //console.log(err)
            } 
        })
    })
}

module.exports.urlVideo = urlVideo