module.exports = (req, res, next) =>
  Promise.resolve({
    hero: {
      header: 'Our Mission',
      intro: '<p>Lucky Day Gaming has the highest quality of service and games in the video gaming industry. As a Licensed Terminal Operator, we strive to offer the best for our clients.</p>',
      taunt: `Let's get lucky`,
      image: {
        url: '/images/home/hero.jpg',
        alt: 'A slot machine violently explodes with luck.'
      }
    },
    topSection: {
      image: {
        url: '/images/home/slot-machines.png',
        alt: 'A trio of slot machines.'
      },
      header: 'Partnerships',
      description: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with with Bally, IGT™, WMS, and Spielo™.</p>',
      cta: {
        label: 'Learn more',
        url: '/partnerships'
      }
    },
    middleSection: {
      image: {
        url: '/images/home/pie-chart.png',
        alt: 'A trio of slot machines.'
      },
      header: 'About Gaming',
      description: '<p>In the Illinois video gaming market, compliance is key if you want to hold on to your gaming license. Ensuring you stay compliant means understanding a robust legal landscape AND keeping up with changes in the market.</p>',
      cta: {
        label: 'Learn more',
        url: '/about-gaming'
      }
    },
    bottomSection: {
      image: {
        url: '/images/home/gold-pile.png',
        alt: 'A trio of slot machines.'
      },
      header: 'Legal Notice',
      description: '<p>Lucky Day Gaming is a Terminal Operator licensed by the Illinois Gaming Board who strategically places slot machines and amusements in  establishments throughout Illinois.</p>',
      cta: {
        label: 'Learn more',
        url: '/faqs'
      }
    }
  })
  .then(data => res.json(data))
  .catch(reason => next(reason))
