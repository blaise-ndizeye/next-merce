import formidable from "formidable"
import fs from "fs"
import path from "path"
import { getError } from "./error"

const isFileValid = (file) => {
  const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
  const findType = imageTypes.find((type) => type === file.type)
  if (!findType) return false
  return true
}

export default function (req, res, next) {
  const form = formidable.IncomingForm()
  const uploadFolder = path.join(process.env.ROOT, "public", "images")

  form.multiples = true
  form.maxFileSize = 50 * 1024 * 1024
  form.uploadDir = uploadFolder

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the files")
      return res.status(400).send(getError(err))
    }
    if (files.image && !files.image.length) {
      const file = files.image
      const isValid = isFileValid(file)
      const fileName = file.name

      if (!isValid)
        return res
          .status(400)
          .send({ message: "The file type is not valid image type" })

      try {
        fs.renameSync(file.path, path.join(uploadFolder, fileName))
        req.body = { ...fields, image: `/images/${fileName}` }
        next()
      } catch (err) {
        console.error(err)
        res.status(500).send(getError(err))
      }
    } else {
      req.body = fields
      next()
    }
  })
}
