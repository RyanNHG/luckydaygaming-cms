module.exports = (app) => {
  // API
  app.get('/api/layouts/default', require('./layouts/default'))

  app.get('/api/pages/home', require('./pages/home'))

  app.get('/api/pages/our-company', require('./pages/landing')({
    name: 'OurCompany'
  }))
  app.get('/api/pages/our-company/:slug', require('./pages/detail')({
    name: 'OurCompany'
  }))

  app.get('/api/pages/partnerships', require('./pages/landing')({
    name: 'Partnerships'
  }))
  app.get('/api/pages/partnerships/:slug', require('./pages/detail')({
    name: 'Partnerships'
  }))

  app.get('/api/pages/about-gaming', require('./pages/landing')({
    name: 'AboutGaming'
  }))
  app.get('/api/pages/about-gaming/:slug', require('./pages/detail')({
    name: 'AboutGaming'
  }))

  // Not Found
  app.use((req, res, next) =>
    res.status(404).json({
      error: true,
      message: `No route found at ${req.originalUrl}`
    })
  )

  // Server Error
  app.use((err, req, res, next) => {
    console.error('500', err)
    res.status(500).json({
      error: true,
      message: err
    })
  })
}
