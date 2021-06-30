import argFlag from './../../assets/img/ArgFlag.png'
import colFlag from './../../assets/img/ColFlag.png'
import mexFlag from './../../assets/img/MexFlag.png'

const devs = [{
        id: 1,
        data: {
            title: 'Argentina',
            flag: argFlag,
            devs: [{
                    name: 'Baeza Mariano',
                    linkedinURL: 'https://www.linkedin.com/in/mariano-baeza-brandauer-8649871bb/'
                },
                {
                    name: 'Basili Pablo',
                    linkedinURL: 'https://www.linkedin.com/in/basilipablo/'
                },
                {
                    name: 'León Federico',
                    linkedinURL: 'https://www.linkedin.com/in/federico-leon/'
                },
                {
                    name: 'Nuñez Nicolás',
                    linkedinURL: 'https://www.linkedin.com/in/nu%C3%B1ezdev/'
                },
                {
                    name: 'Radicella Theo',
                    linkedinURL: 'https://www.linkedin.com/in/theoradicella/'
                },
                {
                    name: 'Rosales Federico',
                    linkedinURL: 'https://www.linkedin.com/in/federico-rosales96/'
                }
            ]
        }
    },
    {
        id: 2,
        data: {
            title: 'Colombia',
            flag: colFlag,
            devs: [{
                name: 'Vivas David',
                linkedinURL: 'https://www.linkedin.com/in/christiandavidvivas7/'
            }]
        }
    },
    {
        id: 3,
        data: {
            title: 'México',
            flag: mexFlag,
            devs: [{
                name: 'Montero Antonio',
                linkedinURL: 'https://www.linkedin.com/404?_l=en_US'
            }]
        }
    }
];

export default devs;