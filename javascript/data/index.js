import { constants } from "../constants/index.js";
const { windowTypes } = constants();

export function data() {
  const windowOptions = {
    edit: 'Edit',
    favorites: 'Favorites',
    file: 'File',
    go: 'Go',
    help: 'Help',
    search: 'Search',
    tools: 'Tools',
    view: 'View'
  }

  const programs = [
    {
      name: 'My Computer',
      icon: 'assets/images/computer.png',
      options: [],
      type: windowTypes.system,
      content: [
        {
          title: 'Ki Jung Kim',
          tag: 'general',
          data: [
            'Fullstack developer with diverse range of stack and experience',
            'Over 7 years in enterprise-scale application development',
            'Application security enthusiast and OWASP fanatic',
            'Self-motivated with an aptitude for learning'
          ]
        },
        {
          title: 'Fun Facts',
          tag: 'facts',
          data: [
            'has 2 fur-baby cats and one of them is a cancer survivor!',
            'likes to build and make things',
            'was born and raised in Seoul until 4th grade',
            'is fluent in Korean',
            'prefers the cold',
            'is an FPV drone enthusiast'
          ]
        },
        {
          title: 'Contact Info',
          tag: 'contact',
          data: [
            {
              icon: 'assets/images/home.png',
              alt: 'home',
              text: 'Located in Honolulu, HI',
            },
            {
              icon: 'assets/images/email.png',
              alt: 'email',
              text: 'kimkijung@icloud.com',
            },
            {
              icon: 'assets/images/linkedin.png',
              alt: 'linkedin',
              text: 'linkedin.com/in/kimkijung'
            },
            {
              icon: 'assets/images/github.png',
              alt: 'github',
              text: 'github.com/harambear',
            }
          ]
        }
      ],
      height: '40rem',
      width: '30rem'
    },
    {
      name: 'Site Help',
      icon: 'assets/images/help-book.png',
      class: '--line-below',
      options: [
        windowOptions.file,
        windowOptions.view,
        windowOptions.help
      ],
      type: windowTypes.help,
      content: [
        {
          title: 'Introduction',
          tag: 'introduction',
          data: [
            'Take a step back in time to the turn of the millennium, when a dull-gray desktop sat on the table alongside a giant CRT monitor.',
            'The computer would turn on sluggishly after a few beeps and grinds and the familiar logo of Windows would loop endlessly as it tries to load. After what seems like an eternity, the quirky color of the desktop would finally shine the screen.',
            'Welcome to Kimdows 98, a web-version of what used to be cutting edge of our millenial childhood.'
          ]
        },
        {
          title: 'Inspiration',
          tag: 'inspiration',
          data: [
            'As an early 90\'s baby, Windows 98 was my very first operating system. It was quirky, oldschool, and full of things to break; looking back at it filled me with nostalgia.',
            'I created my resume site to pay homage to my "Gateway-OS"; the one that kickstarted my life in tech.']
        },
        {
          title: 'Stack',
          tag: 'stack',
          data: [
            'For this project, I wanted to keep it as simple as possible. I started with vanilla CSS, HTML, and JavaScript, but soon decided to leverage Sassy CSS (SCSS) for better management of BEM naming convention.',
            'BEM is something I use at my current position, and it was something I wanted to incorporate into a personal project. I did soon learn that DOM manipulations are quite verbose with this method; it\'ll be something to reconsider during a refactor.',
            'For JavaScript, ES6 modules were used for code and logic separation; however, since there are a lot of moving pieces in this application, a templating engine might have been worth the bundle size.'
          ]
        },
        {
          title: 'Takeaways',
          tag: 'takeaways',
          data: [
            'BEM has it\'s pros and cons; it makes for modular styles, but very cumbersome to work with when a lot of JavaScript DOM manipulations are needed.',
            'Application architecture should reflect functionality; Component-heavy applications will benefit from having component-based architecture.',
            'Frameworks are not always needed nor should they be the de facto choice for a frontend developer.'
          ]
        },
      ],
      width: '35rem'
    },
    {
      name: 'Stack',
      icon: 'assets/images/hard-disk.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.help
      ],
      type: windowTypes.folder,
      hasAddressBar: true,
      content:
      {
        title: 'Stack',
        tag: 'stack',
        icon: 'assets/images/hard-disk.png',
        items: [
          {
            title: 'Frontend',
            icon: 'assets/images/directory.png',
            tag: 'frontend',
            items: [
              {
                title: 'Angular',
                icon: 'assets/images/angular.png'
              },
              {
                title: 'CSS',
                icon: 'assets/images/css.png'
              },
              {
                title: 'HTML',
                icon: 'assets/images/html.png'
              },
              {
                title: 'JavaScript',
                icon: 'assets/images/javascript.png'
              },
              {
                title: 'React',
                icon: 'assets/images/react.png'
              },
              {
                title: 'Sassy CSS',
                icon: 'assets/images/sass.png'
              },
              {
                title: 'Vue',
                icon: 'assets/images/vue.png'
              },
            ]
          },
          {
            title: 'Backend',
            icon: 'assets/images/directory.png',
            tag: 'backend',
            items: [
              {
                title: '.NET Core',
                icon: 'assets/images/dotnet-core.png'
              },
              {
                title: '.NET Framework',
                icon: 'assets/images/dotnet-framework.png'
              },
              {
                title: 'NodeJS',
                icon: 'assets/images/nodejs.png'
              },
              {
                title: 'SQL',
                icon: 'assets/images/sql.png'
              }
            ]
          },
          {
            title: 'Platform',
            icon: 'assets/images/directory.png',
            tag: 'platform',
            items: [
              {
                title: 'Adobe Analytics',
                icon: 'assets/images/adobe-analytics.png'
              },
              {
                title: 'Azure',
                icon: 'assets/images/azure.png'
              },
              {
                title: 'Marketo',
                icon: 'assets/images/marketo.png'
              },
              {
                title: 'Optimizely',
                icon: 'assets/images/optimizely.png'
              },
            ]
          }
        ]
      },
      width: '40rem'
    },
    {
      name: 'Experience',
      icon: 'assets/images/console-prompt.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.tools,
        windowOptions.help
      ],
      type: windowTypes.terminal,
      content: [
        {
          name: 'Bank of Hawai\'i',
          position: 'Software Engineer',
          start: 'June 2020',
          end: 'Present',
          duties: [
            '\'Striving for Excellence\' awardee within 6 months of employment',
            'Removed vendor dependency by cultivating in-house capabilities',
            'Orchestrated a platform upgrade from ASP.NET to ASP.NET Core on an enterprise-scale application',
            'Coordinated over a dozen platform-integrations including Adobe Analytics, cookie compliance, and Marketo',
            'Developed end-to-end solutions and APIs to support business directives',
            'Identified and deployed WAF rules to mitigate DDoS attacks',
            'Directed a switch to CI/CD pipelines for development team',
            'Automated business procedures to alleviate process bottlenecks',
            'Facilitated initiatives from other teams by serving as an application security consultant'
          ]
        },
        {
          name: 'CGI',
          position: 'Consultant',
          start: 'February 2020',
          end: 'June 2020',
          duties: [
            'Evaluated application throughput and resource bottlenecks',
            'Designed and executed benchmark test scripts that mimic thousands of real-time users',
            'Facilitated in resolution of system weakpoints'
          ]
        },
        {
          name: 'AMC Asia! + Meta',
          position: 'Messenger Application Contractor',
          start: 'August 2018',
          end: 'December 2022',
          duties: [
            'Performed as sole contractor to implement Messenger bots for Meta\'s Event Operations team',
            'Delivered scalable applications that handled webhook connections of over 2,000 concurrent users',
            'Featured in several Meta conventions across asia, such as:',
            'Facebook Marketing Partners for Messaging (2022)',
            'One APAC Global Marketing Summit (2018, 2019, 2020)',
            'Women\'s Leadership Day Conference (2019)',
            'Facebook Marketing Summit (2018, 2019)',
            'Level Up Seoul (2018)',
          ]
        },
        {
          name: 'eWorld Enterprise Solutions',
          position: 'Systems Analyst - Fullstack Developer',
          start: 'August 2018',
          end: 'February 2020',
          duties: [
            'Modernized COBOL payroll systems to .NET Core for over 40,000 employees of Hawai\'i State Department of Education',
            'Implemented Single Page Applications using VueJS',
            'Optimized SQL queries often exceeding millions of effective-dated records',
            'Identified and resolved data-input errors by querying and comparing multiple datasets via Python script',
            'Mentored client developer team for ensured success post-delivery'
          ]
        }
      ],
      width: '40rem'
    },
    {
      name: 'Education',
      icon: 'assets/images/notepad.png',
      class: '--line-below',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.search,
        windowOptions.help
      ],
      type: windowTypes.notepad,
      content: [
        {
          name: 'DevLeague',
          description: 'JavaScript Software Engineer',
          completionYear: 'Completed Fall 2018'
        },
        {
          name: 'University of Hawai\'i',
          description: 'Bachelors in College of Arts and Sciences',
          completionYear: '2016 Graduate'
        }
      ],
      width: '30rem',
      height: '20rem'
    }
  ];

  return {
    programs,
  }
}