import express from 'express'
const app = express()
const port = 3000
import { readdirSync, createReadStream, statSync } from 'fs'
import { pipeline } from "stream";
import { join } from 'path'
import NodeID3 from "node-id3"

app.get('/!', (req, res) => {
  const musicfolder = join("music")
  const musiclist = readdirSync(musicfolder)

  res.send(musiclist)
})

app.get('/music/:file', (req, res) => {
  const fileParam = req.params.file;
  const range = req.headers.range;

  const file = join("music", fileParam);
  const { size } = statSync(file);

  if (range) {
    /** Extracting Start and End value from Range Header */
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    if (!isNaN(start) && isNaN(end)) {
      start = start;
      end = size - 1;
    }
    if (isNaN(start) && !isNaN(end)) {
      start = size - end;
      end = size - 1;
    }

    // Handle unavailable range request
    if (start >= size || end >= size) {
      // Return the 416 Range Not Satisfiable.
      res.writeHead(416, {
        "Content-Range": `bytes */${size}`
      });
      return res.end();
    }

    /** Sending Partial Content With HTTP Code 206 */
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "audio/mp3"
    });

    let readable = createReadStream(file, { start: start, end: end });
    pipeline(readable, res, err => {
      if(err) console.log(err);
    });
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "audio/mp3"
    });
    let readable = createReadStream(file);
    pipeline(readable, res, err => {
      if(err) console.log(err);
    });
  }
})

app.get ("/cover/:file", (req, res) => {
  const fileParam = req.params.file;
  const file = join("music", fileParam);
  const tags = NodeID3.read(file)
  console.log (tags)
  if (!tags.image){
    return
  }
  res.writeHead(200, {
    'Content-Type': tags.image.mime,
    'Content-Length': tags.image.imageBuffer.length
  })
  res.end(tags.image.imageBuffer);
})

app.use(express.static(join('.', 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

