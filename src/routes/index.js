module.exports = (app) => {
  // API
  app.get('/api/pages/home', require('./pages/home'))

  // Not Found
  app.use((req, res, next) =>
    res.status(404).json()
  )

  // Server Error
  app.use((err, req, res, next) => {
    console.error('500', err)
    res.status(500).json()
  })
}
