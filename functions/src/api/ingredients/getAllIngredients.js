const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')
const corsHandler = require('../../config/cors')

const GetAllIngredients = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed')
    }
    try {
      const ingredientsSnapshot = await db.collection('ingredients').get()
      const ingredients = ingredientsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      res.status(200).json({ status: 'success', data: ingredients })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  })
})

module.exports = { GetAllIngredients }
