import express from "express";
const router = express.Router();
import multer from "multer";

// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
// const base = "http://localhost:3000/";
// const base = process.env.DATABASE_URL;
const base = process.env.DOMAIN_BASE_URL;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage });

router.post('/', upload.single("file"), function (req, res) {
    const host = 'https://193.106.55.237'
    const imageUrl = `${host}/public/${req.file.filename}`;
    console.log("The file that we got is:" + imageUrl);
    return res.status(200).send({ url: imageUrl })
});
export default router;