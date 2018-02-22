module.exports = (req, res, next) =>
  Promise.resolve({
    header: {
      brand: {
        logo: {
          url: '/images/brand-logo.png',
          alt: 'The Lucky Day Gaming logo'
        },
        text: {
          url: '/images/brand-text.svg',
          alt: 'Lucky Day LLC'
        }
      },
      links: {
        left: [
          { label: 'Our Company',
            url: '/about',
            children: [
              { label: 'About Us', url: '/about/our-company' },
              { label: 'Marketing', url: '/about/marketing' },
              { label: 'Leadership', url: '/about/leadership' },
              { label: 'Case Studies', url: '/about/case-studies' }
            ]
          },
          { label: 'Partnerships',
            url: '/partnerships',
            children: [
              { label: 'IGT', url: '/partnerships/igt' },
              { label: 'Bally', url: '/partnerships/bally' },
              { label: 'WMS', url: '/partnerships/wms' },
              { label: 'Spielo', url: '/partnerships/spielo' }
            ]
          },
          { label: 'About Gaming',
            url: '/gaming',
            children: [
              { label: 'Get Licensed', url: '/gaming/get-licensed' },
              { label: 'Revenue', url: '/gaming/revenue' },
              { label: 'Cost', url: '/gaming/cost' },
              { label: 'Equipment', url: '/gaming/equipment' },
              { label: 'Steps to Go Live', url: '/gaming/steps-to-go-live' },
              { label: 'Illinois Gaming Board', url: '/gaming/illinois-gaming-board' }
            ]
          }
        ],
        right: [
          { label: 'Locations', url: '/locations' },
          { label: 'Contact Us', url: '/contact-us' },
          { label: 'FAQs', url: '/faqs' }
        ]
      }
    },
    page: {
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
    },
    footer: {
      logo: {
        url: '/images/brand-logo.png',
        alt: 'The Lucky Day Gaming logo'
      },
      copyright: '© 2018 by Lucky Day, LLC. All rights reserved.',
      links: [
        { label: 'Our Company', url: '/about' },
        { label: 'Partnerships', url: '/partnerships' },
        { label: 'About Gaming', url: '/gaming' },
        { label: 'Locations', url: '/locations' },
        { label: 'Contact Us', url: '/contact-us' },
        { label: 'FAQs', url: '/faqs' }
      ],
      contact: {
        header: 'New Business Inquiry',
        links: [
          {
            prefix: 'P:',
            label: '312.439.0088',
            url: 'tel:312.439.0088'
          },
          {
            prefix: 'E:',
            label: 'luckydayllc@gmail.com',
            url: 'mailto:luckydayllc@gmail.com'
          }
        ]
      },
      social: {
        header: 'Stay Connected',
        links: [
          { label: 'Facebook', icon: 'icon__facebook', url: '#facebook' },
          { label: 'Instagram', icon: 'icon__instagram', url: '#instagram' },
          { label: 'Youtube', icon: 'icon__youtube', url: '#youtube' },
          { label: 'Twitter', icon: 'icon__twitter', url: '#twitter' }
        ]
      }
    }
  })
    .then(data => res.json(data))
    .catch(reason => next(reason))
