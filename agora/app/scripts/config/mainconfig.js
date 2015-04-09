
var Mapper = {
    env: '', 
    helpBaseUrl: 'http://www.gmc-uk.org/help/', 

    // Get browser url and determine environment
    setEnv: function() {
        var url = window.location.origin; 
        
        switch(url) {
            case "http://localhost:9000": 
            this.env = "local"; 
            break; 

            case "http://agoradev.gmc-uk.org":
            this.env = "dev"; 
            break; 

            case "http://agoratest.gmc-uk.org": 
            this.env = "test"; 
            break; 

            case "http://reports.gmc-uk.org": 
            this.env = "prod"; 
            break; 

            
        }
    }, 

       getBaseUrl: function() {
        var baseUrl = {
            'local': 'http://tsttabappvip/views/', 
            'dev': 'http://tsttabappvip/views/', 
            'test': 'http://tsttabappvip/views/', 
            'prod': 'http://s1prdtabaps01/views/'
        }; 

        return baseUrl[this.env]; 
    }, 

    map: {
        'PRS1': {
            'local': 'TheRegister_pub/PRS1', 
            'dev':   'TheRegister_pub/PRS1', 
            'test':  'TheRegister/PRS1', 
            'prod':  'TheRegister/PRS1'
        }, 
        'PRU1': {
            'local': 'TheRegister_pub/PRU1', 
            'dev':   'TheRegister_pub/PRU1', 
            'test':  'TheRegister/PRU1', 
            'prod':  'TheRegister/PRU1'
        }, 
        'PRW1': {
            'local': 'TheRegister_pub/PRW1', 
            'dev':   'TheRegister_pub/PRW1', 
            'test':  'TheRegister/PRW1', 
            'prod':  'TheRegister/PRW1'
        }, 
        'PVS1': {
            'local': 'Revalidation_pub/PVS1', 
            'dev':   'Revalidation_pub/PVS1', 
            'test':  'Revalidation/PVS1', 
            'prod':  'Revalidation/PVS1'
        }, 
        'PVS2': {
            'local': 'Revalidation_pub/PVS2', 
            'dev':   'Revalidation_pub/PVS2', 
            'test':  'Revalidation/PVS2', 
            'prod':  'Revalidation/PVS2'
        }, 
        'PFS1': {
            'local': 'FitnesstoPractice_pub/PFS1', 
            'dev':   'FitnesstoPractice_pub/PFS1', 
            'test':  'FitnesstoPractice_1/PFS1', 
            'prod':  'FitnesstoPractice_1/PFS1'
        },  
            'PFU1': {
            'local': 'FitnesstoPractice_pub/PFU1', 
            'dev':   'FitnesstoPractice_pub/PFU1', 
            'test':  'FitnesstoPractice_1/PFU1', 
            'prod':  'FitnesstoPractice_1/PFU1'
        },  
        'PFW1': {
            'local': 'FitnesstoPractice_pub/PFW1', 
            'dev':   'FitnesstoPractice_pub/PFW1', 
            'test':  'FitnesstoPractice_1/PFW1', 
            'prod':  'FitnesstoPractice_1/PFW1'
        }, 
        'PES1': {
            'local': 'Employers_pub/PES1', 
            'dev':   'Employers_pub/PES1', 
            'test':  'Employers_0/PES1', 
            'prod':  'Employers_0/PES1'
        }, 
        'PEU1': {
            'local': 'Employers_pub/PEU1', 
            'dev':   'Employers_pub/PEU1', 
            'test':  'Employers_0/PEU1', 
            'prod':  'Employers_0/PEU1'
        }, 
        'PMS1': {
            'local': 'MedicalSchools_pub/PMS1', 
            'dev':   'MedicalSchools_pub/PMS1', 
            'test':  'MedicalSchools/PMS1', 
            'prod':  'MedicalSchools/PMS1'
        }, 
        'PMU1': {
            'local': 'MedicalSchools_pub/PMU1', 
            'dev':   'MedicalSchools_pub/PMU1', 
            'test':  'MedicalSchools/PMU1', 
            'prod':  'MedicalSchools/PMU1'
        }, 
        'PDS1': {
            'local': 'Deaneries_pub/PDS1', 
            'dev':   'Deaneries_pub/PDS1', 
            'test':  'DeaneriesLETBs/PDS1', 
            'prod':  'DeaneriesLETBs/PDS1'
        }, 
        'PDU1': {
            'local': 'Deaneries_pub/PDU1', 
            'dev':   'Deaneries_pub/PDU1', 
            'test':  'DeaneriesLETBs/PDU1', 
            'prod':  'DeaneriesLETBs/PDU1'
        }
    }, 

    // Returns the viz url depending on the environment
    getUrl: function(pageId) {
        return this.map[pageId][this.env]; 
    }, 

    // Returns the help page url 
    getHelp: function(pageId) {        
        return this.helpBaseUrl + pageId + ".asp"; 
    }, 

}; 

// Set the environment; 
Mapper.setEnv(); 

var pagesObj = {
        
    reportsBaseUrl: Mapper.getBaseUrl(), 
 
    sectionDescriptions: {
        'Stats': 'See how many doctors are registered with the GMC, their demographic groups, and more.',
        'UK maps' : 'See where in the UK our registered doctors are based.',
        'World maps': 'See in which countries doctors on the register qualified from.'
    }, 
    
    repGroup: [{
        groupName: 'The Register',        
        description: "The register contains information about all doctors who are registered with the GMC.<br/><br/>"
        + "You can explore who doctors on the register are by gender, age bands, ethnicity, nationality and country of medical qualification. "
        + "You can view how many doctors are on the GP or specialist register, as well as their area of speciality. You can also view how many doctors "
        + "in training there are in each speciality, and what stage of training they are at.",         
        colour: '#2a3f61', 
        image: 'reports-0.jpg', 

        pages: {
            'Stats': [{
                pageId: 'PRS1',
                description: "See how many doctors are registered with the GMC, their demographic groups, and more.",
                pageHeading: 'The Register',
                pageSubheading: 'Key stats from the medical register',
                // url: 'TheRegister/PRS1', 
                url: Mapper.getUrl('PRS1'), 
                thumb: 'prs1.png', 
                // help: 'http://www.gmc-uk.org/help/PRS1.asp'
                help: Mapper.getHelp('PRS1')
                
            }, {
                pageId: 'PRS1_H',
                description: 'The Register over time',
                pageHeading: 'The Register',
                pageSubheading: 'The medical register over time',
                url: 'TheRegister/PRS1_H', 
                help: Mapper.getHelp('PRS1_H')
            }, {
                pageId: 'PRS2',
                description: 'The Specialist Register',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'Key stats from the Specialist Register',
                url: 'TheRegister/PRS2', 
                help: Mapper.getHelp('PRS2')
            }, {
                pageId: 'PRS2_H',
                description: 'The Specialist Register over time',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'The Specialist Register over time',
                url: 'TheRegister/PRS2_H', 
                help: Mapper.getHelp('PRS2_H')
            }, {
                pageId: 'PRS3',
                description: 'Trainees',
                pageHeading: 'Trainees',
                pageSubheading: 'Doctors on the register who are known to be in training',
                url: 'TheRegister_pub/PRS3', 
                help: Mapper.getHelp('PRS3')
            }, {
                pageId: 'PRS3_H',
                description: 'Trainees over time',
                pageHeading: 'Trainees',
                pageSubheading: 'Trainees over time', 
                help: Mapper.getHelp('PRS1_H')
            }, {
                pageId: 'PRS4',
                description: 'The GP Register',
                pageHeading: 'The GP Register',
                pageSubheading: 'Total number of GPs on the register over time',
                url: 'TheRegister_pub/PRS4', 
                help: Mapper.getHelp('PRS4')
            }],
            'UK maps': [{
                pageId: 'PRU1',
                description: 'See where in the UK our registered doctors are based.',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by UK country', 
                url: Mapper.getUrl('PRU1'), 
                thumb: 'pru1.png', 
                // help: 'http://www.gmc-uk.org/help/PRU1.asp'
                help: Mapper.getHelp('PRU1')
            }, {
                pageId: 'PRU2',
                description: 'The Register UK Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by UK postcode', 
                url: 'TheRegister_pub/PRU2', 
                help: Mapper.getHelp('PRU2')
            }],
            'World maps': [{
                pageId: 'PRW1',
                description: 'See in which countries doctors on the register qualified from.',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by country of qualification', 
                url: Mapper.getUrl('PRW1'), 
                thumb: 'prw1.png', 
                help: Mapper.getHelp('PRW1')
            }]
        },
    }, {
        groupName: 'Revalidation',
        description: "Every five years each doctor is required to demonstrate they are fit to practise and that their knowledge and skills are up to date."
        + "This helps to ensure that all doctors in the UK are giving patients a good standard of care.<br/><br/>"
        + "This section contains data about how many doctors have revalidated. As the revalidation process continues this data will become more complete untill all doctors "
        + "practising in the UK have completed their first revalidation cycle.", 
        colour: '#2ca7bf', 
        image: 'reports-1.jpg',         
        pages: {
            'Stats': [{
                pageId: 'PVS1',
                description: 'Under construction...',
                pageHeading: 'Revalidation',
                pageSubheading: 'Revalidation connections',
                url: Mapper.getUrl('PVS1'), 
                thumb: 'pvs1.png', 
                help: Mapper.getHelp('PVS1')
            }]
        }
    }, {
        groupName: 'Fitness to practise',
        description: "This section contains data about our fitness to practise processes, for occasions when doctors' performance falls below the expected standard."
        + "You can explore data on how many complaints lead to investigation and how many investigations lead to sanctions against doctors. "
        + " You can see what sort of allegations we receive, and data about the doctors who end up in our fitness to practise process.", 
        image: 'reports-2.jpg', 
        colour: '#5a2a80', 
        pages: {
            'Stats': [{
                pageId: 'PFS1',
                description: 'See how many complaints we have received. Explore the number of doctors who have received complaints, what sorts of allegations are investigated and what sort of outcomes there were.',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Key volumes by year',
                url: Mapper.getUrl('PFS1'), 
                thumb: 'pfs1.png', 
                help: Mapper.getHelp('PFS1')
            }, {
                pageId: 'PFS2',
                description: 'Allegations',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Volumes of Allegations',
                url: 'FitnesstoPractise_pub/PFS2', 
                help: Mapper.getHelp('PFS2')
            }, {
                pageId: 'PFS3',
                description: 'Allegations mapped',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Volumes of Allegations',
                url: 'FitnesstoPractise_pub/PFS3',                 
                help: Mapper.getHelp('PFS3')
            }, {
                pageId: 'PFS4',
                description: 'Complaints',
                pageHeading: 'Complaints',
                pageSubheading: 'Complaints received, and their overall Outcome',
                url: 'FitnesstoPractise_pub/PFS4',                 
                help: Mapper.getHelp('PFS4')
            }, {
                pageId: 'PFS5',
                description: 'Sanctions',
                pageHeading: 'Fitness to practise sanctions',
                pageSubheading: 'FtP Sanctions imposed',
                url: 'FitnesstoPractise_pub/PFS5',                 
                help: Mapper.getHelp('PFS5')
            }],
            'UK maps': [{
                pageId: 'PFU1',
                description: 'See where doctors who are complained about were practising.',
                pageHeading: 'Ftp Sanctions mapped',
                pageSubheading: 'Current Designated Body of doctors with sanctions',
                url: Mapper.getUrl('PFU1'), 
                thumb: 'pfu1.png', 
                help: Mapper.getHelp('PFU1')
            }, {
                pageId: 'PFU2',
                description: 'FTP UK Map',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Current Designated Body of doctors with sanctions (relative to DB size)',
                url: 'FitnesstoPractise_pub/PFU2', 
                help: Mapper.getHelp('PFU2')
            }, {
                pageId: 'PFU3',
                description: 'FTP UK Map',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Medical School of doctors with sanctions',
                url: 'FitnesstoPractise_pub/PFU3', 
                help: Mapper.getHelp('PFU3')
            }],
            'World Maps': [{
                pageId: 'PFW1',
                description: 'See how many doctors from each country were involved in fitness to practise proceedings.',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Country of primary medical qualifiation of doctors with sanctions',
                url: Mapper.getUrl('PFW1'), 
                thumb: 'pfw1.png', 
                help: Mapper.getHelp('PFW1')
            }, {
                pageId: 'PFW2',
                description: 'FTP World Map Active sanctions',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Country of PMQ of doctors with current sanctions - relative to PMQ population',
                url: 'FitnesstoPractise_pub/PFW2', 
                help: Mapper.getHelp('PFW2')
            }]
        }
    }, {
        groupName: 'Employers',
        description: "Doctors in the UK are employed in a wide range of different environments. "
        + "From large hospitals to GP clinics to other organisations, the profession is diverse and ever evolving. "
        + "We work with all kinds of employers to ensure patients receive the best possible care and that doctors can practise successfully.<br/><br/>"
        + "This section contains data about organisations who employ the doctors on our register."
        + "It aims to show the population of doctors that work in an organisation, the geographic spread of doctors across the UK, and some of the outcomes "
        + "for doctors working in these locations", 
        image: 'reports-3.jpg', 
        colour: '#b05898',         
        pages: {
            'Stats': [{
                pageId: 'PES1',
                description: "See how many doctors work for each trust, agency and other emplying bodies. Find out the breakdown of the doctors's specialities, demographics and more in each case.",
                pageHeading: 'Employers overview',
                pageSubheading: 'Key stats from the register, by organisation (Drs\' Designated Bodies)',
                url: Mapper.getUrl('PES1'), 
                thumb: 'pes1.png', 
                help: Mapper.getHelp('PES1')

            }, {
                pageId: 'PES10',
                description: 'Employer Stats (FtP)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key FtP Stats by organisation (Drs\' Designated Bodies)',
                url: 'Employers_pub/PES10', 
                help: Mapper.getHelp('PES10')

            }, {
                pageId: 'PES21',
                description: 'Employer Stats (Reval)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key Revalidation stats by Designated Body',
                url: 'Employers_pub/PES21', 
                help: Mapper.getHelp('PES21')
            }, {
                pageId: 'PES34',
                description: 'Employer Summary (The Register)',
                pageHeading: 'Employer summary',
                pageSubheading: 'Stats from the medical register',
                url: 'Employers_pub/PES34', 
                help: Mapper.getHelp('PES34')
            }, {
                pageId: 'PES35',
                description: 'Employer Summary (FtP)',
                pageHeading: 'Employer summary',
                pageSubheading: 'Fitness to Practise information',
                url: 'Employers_pub/PES35', 
                help: Mapper.getHelp('PES35')
            }],

            'UK maps': [{
                pageId: 'PEU1',
                description: "See where employers are based and how many employers are in each region.",
                pageHeading: 'Employers mapped',
                pageSubheading: 'Doctor\'s employers (Designated Bodies), by location',
                url: Mapper.getUrl('PEU1'), 
                thumb: 'peu1.png', 
                help: Mapper.getHelp('PEU1')
            }]

        }
    }, {
        groupName: 'Medical Schools',
        description: "This section contains data about doctors who have registered with us from UK medical schools.<br/><br/>"
        + "You can explore different cohort groups by year of graduation, gender, age bands, ethnicity and nationality. "
        + "You can also view data on doctors in training, their training speciality and level. "
        + "And you can see what specialities doctors have completed training in and what their current roles are.", 
        image: 'reports-4.jpg', 
        colour: '#7c418c',            
        pages: {
            'Stats': [{
                pageId: 'PMS1',
                description: 'See how many doctors have registered from each UK medical school over time, their demographics, what they have specialised in, their current roles and more',
                pageHeading: 'Medical schools',
                pageSubheading: 'Doctors attaining Primary Medical Qualification at UK Medical Schools', 
                url: Mapper.getUrl('PMS1'), 
                thumb: 'pms1.png', 
                help: Mapper.getHelp('PMS1')
            }, {
                pageId: 'PMS2', 
                description: 'See how many doctors have registered from each UK medical school over time, their demographics, what they have specialised in, their current roles and more',
                pageHeading: 'Medical schools', 
                pageSubheading: 'Doctors with sanctions per 1000 doctors qualified', 
                help: Mapper.getHelp('PMS2')
            } 
            ],
            'UK maps': [{
                pageId: 'PMU1',
                description: 'See where each medical school is and summary information on each school.',
                pageHeading: 'Medical schools',
                pageSubheading: 'Locations of UK medical schools', 
                url: Mapper.getUrl('PMU1'), 
                thumb: 'pmu1.png', 
                help: Mapper.getHelp('PMU1')
            }]
        }
    }, 

    // {
    //     groupName: 'Royal Colleges',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis in laborum sint molestias. Voluptate placeat harum pariatur? Eius, saepe id mollitia facere numquam recusandae, itaque blanditiis quibusdam molestias odio nobis?', 
    //     image: 'reports-5.jpg', 
    //     colour: '#7b6fb1',            
    //     pages: {
    //         'Stats': [{
    //             pageId: 'X_PCS1',
    //             description: 'Royal Colleges/Specialities Stats',
    //             pageHeading: '-',
    //             pageSubheading: '-'
    //         }],
    //         'UK maps': [{
    //             pageId: 'X_PCU1',
    //             description: 'Royal Colleges/Specialities UK Map'
    //         }]

    //     }
    // }, 
    {
        groupName: 'Deaneries and LETBs',
        description: "We assure the quality of doctors' training and that involves us working with Postgraduate Deaneries and Local Eduction and Training Boards (LETBs), " 
        + "who are responsible for training doctors across the UK.<br/><br/>"
        + "This section contains data about these bodies and doctors in postgraduate training who fall under them, "
        + "the programmes they are training in and outcomes from different cohort groups.", 
        image: 'reports-6.jpg', 
        colour: '#4275b3',            
        pages: {
            'Stats': [{
                pageId: 'PDS1',
                description: "See how many postgraduate doctors are in training by deanery/LETB, their training specialities and level, demographics and more",
                pageHeading: 'Deaneries & LETBs',
                pageSubheading: 'Postgraduate trainees at Deaneries / LETBs', 
                url: Mapper.getUrl('PDS1'), 
                thumb: 'pds1.png', 
                help: Mapper.getHelp('PDS1')
            }], 
            'UK maps': [{
                pageId: 'PDU1', 
                description: "See where each Postgraduate Deanery/LETB is and summary information on each.", 
                pageHeading: 'Deaneries and LETBs', 
                pageSubheading: 'Locations of Deaneries and LETBs', 
                url: Mapper.getUrl('PDU1'), 
                thumb: 'pdu1.png', 
                help: Mapper.getHelp('PDU1')
            }]
        }
    }]
};
