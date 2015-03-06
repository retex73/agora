var pagesObj = {
    // reportsBaseUrl: 'http://s1tsttabaps01/views/', 
    // reportsBaseUrl: 'http://s1prdtabaps01/views/', 
    reportsBaseUrl: 'http://tsttabappvip/views/', 

    // reportsBaseUrl: 'https://public.tableausoftware.com/',    
    // reportsBaseUrl: 'https://public.tableausoftware.com/views/', 

    sectionDescriptions: {
        'Stats': 'Graphs describing the medical register',
        'UK maps' : 'Maps describing the medical register',
        'World maps': 'World maps describing the medical register'
    }, 
    
    repGroup: [{
        groupName: 'The Register',        
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi quia dolore, dicta, minus amet, voluptas aliquid praesentium sequi nam accusamus repellat ratione consectetur. Laborum commodi doloremque, repellendus qui veniam corporis.', 
        colour: '#2a3f61', 
        image: 'reports-0.jpg', 

        pages: {
            'Stats': [{
                pageId: 'PRS1',
                description: 'The Register Stats',
                pageHeading: 'The Register',
                pageSubheading: 'Key stats from the medical register',
                url: 'TheRegister/PRS1'
                // url: 'TheRegister_pub/PRS1'                
                // url: 'shared/RXR9Q6PPD?:display_count=yes'
                // url: 'USForestFires/Dashboard1?:embed=y&:display_count=yes&:loadOrderID=0'
            }, {
                pageId: 'PRS1_H',
                description: 'The Register over time',
                pageHeading: 'The Register',
                pageSubheading: 'The medical register over time',
                url: 'TheRegister/PRS1_H'
            }, {
                pageId: 'PRS2',
                description: 'The Specialist Register',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'Key stats from the Specialist Register',
                url: 'TheRegister/PRS2'
            }, {
                pageId: 'PRS2_H',
                description: 'The Specialist Register over time',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'The Specialist Register over time',
                url: 'TheRegister/PRS2_H'
            }, {
                pageId: 'PRS3',
                description: 'Trainees',
                pageHeading: 'Trainees',
                pageSubheading: 'Doctors on the register who are known to be in training',
                url: 'TheRegister_pub/PRS3'
            }, {
                pageId: 'PRS3_H',
                description: 'Trainees over time',
                pageHeading: 'Trainees',
                pageSubheading: 'Trainees over time'
            }, {
                pageId: 'PRS4',
                description: 'The GP Register',
                pageHeading: 'The GP Register',
                pageSubheading: 'Total number of GPs on the register over time',
                url: 'TheRegister_pub/PRS4'
            }],
            'UK maps': [{
                pageId: 'PRU1',
                description: 'The Register UK Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by UK country', 
                url: 'TheRegister/PRU1'
            }, {
                pageId: 'PRU2',
                description: 'The Register UK Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by UK postcode', 
                url: 'TheRegister_pub/PRU2'
            }],
            'World maps': [{
                pageId: 'PRW1',
                description: 'The Register World Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by country of qualification', 
                url: 'TheRegister/PRW1'
            }]
        },
    }, {
        groupName: 'Revalidation',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum animi placeat, molestias, esse quam id eligendi, deleniti quia neque distinctio quis enim! Consequatur magni, dignissimos et facere quod vero tenetur!', 
        colour: '#2ca7bf', 
        image: 'reports-1.jpg',         
        pages: {
            'Stats': [{
                pageId: 'PVS2',
                description: 'Connected Doctors',
                pageHeading: 'Revalidation',
                pageSubheading: 'Revalidation connections',
                url: 'Revalidation_Pub/PVS1'
            }]
        }
    }, {
        groupName: 'Fitness to practise',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, illum dignissimos, quaerat, eveniet repellat ullam dicta nesciunt iusto, harum necessitatibus fugiat labore repellendus reprehenderit. Doloribus mollitia, magni voluptatum eum ratione.', 
        image: 'reports-2.jpg', 
        colour: '#5a2a80', 
        pages: {
            'Stats': [{
                pageId: 'PFS1',
                description: 'FTP Stats',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Key volumes by year',
                url: 'FitnesstoPractice_1/PFS1'
            }, {
                pageId: 'PFS2',
                description: 'Allegations',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Volumes of Allegations',
                url: 'FitnesstoPractise_pub/PFS2'
            }, {
                pageId: 'PFS3',
                description: 'Allegations mapped',
                pageHeading: 'Fitness to practise',
                pageSubheading: 'Volumes of Allegations',
                url: 'FitnesstoPractise_pub/PFS3'
            }, {
                pageId: 'PFS4',
                description: 'Complaints',
                pageHeading: 'Complaints',
                pageSubheading: 'Complaints received, and their overall Outcome',
                url: 'FitnesstoPractise_pub/PFS4'
            }, {
                pageId: 'PFS5',
                description: 'Sanctions',
                pageHeading: 'Fitness to practise sanctions',
                pageSubheading: 'FtP Sanctions imposed',
                url: 'FitnesstoPractise_pub/PFS5'
            }],
            'UK maps': [{
                pageId: 'PFU1',
                description: 'FTP UK Map',
                pageHeading: 'Ftp Sanctions mapped',
                pageSubheading: 'Current Designated Body of doctors with sanctions',
                url: 'FitnesstoPractice_1/PFU1'
            }, {
                pageId: 'PFU2',
                description: 'FTP UK Map',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Current Designated Body of doctors with sanctions (relative to DB size)',
                url: 'FitnesstoPractise_pub/PFU2'
            }, {
                pageId: 'PFU3',
                description: 'FTP UK Map',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Medical School of doctors with sanctions',
                url: 'FitnesstoPractise_pub/PFU3'
            }],
            'World Maps': [{
                pageId: 'PFW1',
                description: 'FTP World Map',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Country of primary medical qualifiation of doctors with sanctions',
                url: 'FitnesstoPractise_pub/PFW1'
            }, {
                pageId: 'PFW2',
                description: 'FTP World Map Active sanctions',
                pageHeading: 'FtP Sanctions mapped',
                pageSubheading: 'Country of PMQ of doctors with current sanctions - relative to PMQ population',
                url: 'FitnesstoPractise_pub/PFW2'
            }]
        }
    }, {
        groupName: 'Employers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius dicta eos ullam beatae temporibus odit deleniti ad explicabo facilis totam dolorum ducimus, porro deserunt magni nobis, recusandae vel! At, quidem!', 
        image: 'reports-3.jpg', 
        colour: '#b05898',         
        pages: {
            'Stats': [{
                pageId: 'PES1',
                description: 'Employers Stats (The Register)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key stats from the register, by organisation (Drs\' Designated Bodies)',
                url: 'Employers_0/PES1'
            }, {
                pageId: 'PES10',
                description: 'Employer Stats (FtP)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key FtP Stats by organisation (Drs\' Designated Bodies)',
                url: 'Employers_pub/PES10'

            }, {
                pageId: 'PES21',
                description: 'Employer Stats (Reval)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key Revalidation stats by Designated Body',
                url: 'Employers_pub/PES21'
            }, {
                pageId: 'PES34',
                description: 'Employer Summary (The Register)',
                pageHeading: 'Employer summary',
                pageSubheading: 'Stats from the medical register',
                url: 'Employers_pub/PES34'
            }, {
                pageId: 'PES35',
                description: 'Employer Summary (FtP)',
                pageHeading: 'Employer summary',
                pageSubheading: 'Fitness to Practise information',
                url: 'Employers_pub/PES35'
            }],

            'UK maps': [{
                pageId: 'PEU1',
                description: 'Employers UK Map',
                pageHeading: 'Employers mapped',
                pageSubheading: 'Doctor\'s employers (Designated Bodies), by location',
                url: 'Employers_0/PEU1'
            }]

        }
    }, {
        groupName: 'Medical Schools',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod temporibus delectus sit a ullam aliquam animi ex, nam voluptates ut deleniti repellendus sunt dolore magnam voluptatibus id hic molestiae! Quod.', 
        image: 'reports-4.jpg', 
        colour: '#7c418c',            
        pages: {
            'Stats': [{
                pageId: 'X__PMS1',
                description: 'Medical Schools stats',
                pageHeading: '-',
                pageSubheading: '', 
                url: 'MedicalSchools/PMS1'
            }],
            'UK maps': [{
                pageId: 'X__PMU1',
                description: 'Medical Schools UK Map',
                pageHeading: '-',
                pageSubheading: '-', 
                url: 'MedicalSchools/PMu1'
            }],
            'World maps': [{
                pageId: 'X__PMW1',
                description: 'Medical Schools World Map',
                pageHeading: '-',
                pageSubheading: '-'
            }]
        }
    }, {
        groupName: 'Royal Colleges',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis in laborum sint molestias. Voluptate placeat harum pariatur? Eius, saepe id mollitia facere numquam recusandae, itaque blanditiis quibusdam molestias odio nobis?', 
        image: 'reports-5.jpg', 
        colour: '#7a71ad',            
        pages: {
            'Stats': [{
                pageId: 'X_PCS1',
                description: 'Royal Colleges/Specialities Stats',
                pageHeading: '-',
                pageSubheading: '-'
            }],
            'UK maps': [{
                pageId: 'X_PCU1',
                description: 'Royal Colleges/Specialities UK Map'
            }]

        }
    }, {
        groupName: 'Deaneries',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quis autem consequuntur sapiente tempore deserunt odit sunt magni, earum totam consectetur enim aliquam dolorum explicabo quam sequi blanditiis beatae. Perspiciatis.', 
        image: 'reports-6.jpg', 
        colour: '#4275b3',            
        pages: {
            'Stats': [{
                pageId: 'X__PDS1',
                description: 'Deaneries Stats',
                pageHeading: '-',
                pageSubheading: '-'
            }]
        }
    }]
};
