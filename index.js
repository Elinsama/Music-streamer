const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')

app.get('/!', (req, res) => {
    const musicfolder = path.join("music")
    const musiclist = fs.readdirSync(musicfolder)
    res.send(musiclist)
})

app.get('/:file', (req, res) => {
    const file = req.params.file
    res.setHeader("content-type", "audio/mp3")
    fs.createReadStream(path.join("music", file)).pipe(res)
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})