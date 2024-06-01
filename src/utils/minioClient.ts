import * as Minio from 'minio'
import express from 'express'

const router = express.Router()

const minioClient = new Minio.Client({
    endPoint: 'localhost:9000',
    useSSL: false,
    accessKey: 'minio',
    secretKey: 'minio123',
  })

export default minioClient