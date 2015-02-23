var pagesObj = {
    // reportsBaseUrl: 'http://s1tsttabaps01/views/', 
    reportsBaseUrl: 'http://s1prdtabaps01/views/', 

    // reportsBaseUrl: 'https://public.tableausoftware.com/',    
    // reportsBaseUrl: 'https://public.tableausoftware.com/views/', 

    sectionDescriptions: {
        stats: 'Graphs describing the medical register',
        uk: 'Maps describing the medical register',
        world: 'World maps describing the medical register'
    }, 
    
    repGroup: [{
        groupName: 'The Register',        
        description: 'At the GMC we maintain the UK Medical Register. Here we describe lots of stuff<br/>And here is another introduction sentence', 

        pages: {
            stats: [{
                pageId: 'PRS1',
                description: 'The Register Stats',
                pageHeading: 'The Register',
                pageSubheading: 'Key stats from the medical register',
                url: 'TheRegister_pub/PRS1'                
                // url: 'shared/RXR9Q6PPD?:display_count=yes'
                // url: 'USForestFires/Dashboard1?:embed=y&:display_count=yes&:loadOrderID=0'
            }, {
                pageId: 'PRS1_H',
                description: 'The Register over time',
                pageHeading: 'The Register',
                pageSubheading: 'The medical register over time'
            }, {
                pageId: 'PRS2',
                description: 'The Specialist Register',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'Key stats from the Specialist Register',
                url: 'TheRegisterv5/PRS2'
            }, {
                pageId: 'PRS2_H',
                description: 'The Specialist Register over time',
                pageHeading: 'The Specialist Register',
                pageSubheading: 'The Specialist Register over time'
            }, {
                pageId: 'PRS3',
                description: 'Trainees',
                pageHeading: 'Trainees',
                pageSubheading: 'Doctors on the register who are known to be in training',
                url: 'TheRegisterv5/PRS3'
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
                url: 'TheRegisterv5/PRS4'
            }],
            uk: [{
                pageId: 'PRU1',
                description: 'The Register UK Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by area', 
                url: 'TheRegisterv5/PRS4'
            }],
            world: [{
                pageId: 'PRW1',
                description: 'The Register World Map',
                pageHeading: 'The Register',
                pageSubheading: 'Doctor population by country of qualification', 
                url: 'TheRegisterv5/PRS4'
            }]
        },
    }, {
        groupName: 'Revalidation',
        description: 'At the GMC we maintain Revalidation. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'PVS1',
                description: 'Revalidation',
                pageHeading: 'Revalidation',
                pageSubheading: 'Revalidation connections'
            }, {
                pageId: 'PVS1_H',
                description: 'Revalidation over time',
                pageHeading: 'Revalidation',
                pageSubheading: 'Revalidation connections over time'
            }, {
                pageId: 'PVS2',
                description: 'Connected Doctors',
                pageHeading: 'Revalidation',
                pageSubheading: 'Revalidation connections'
            }, {
                pageId: 'PVS3',
                description: 'Unconnected Doctors',
                pageHeading: 'Revalidation',
                pageSubheading: 'Locations of doctors with no revalidation connection'
            }, {
                pageId: 'PVS4',
                description: 'NPC Doctors',
                pageHeading: 'Revalidation',
                pageSubheading: 'Doctors with No prescribed connection'
            }]
        }

    }, {
        groupName: 'Fitness to practice',
        description: 'At the GMC we maintain the Fitness To Practice. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'PFS1',
                description: 'FTP Stats',
                pageHeading: 'Fitness to practice',
                pageSubheading: 'Key volumes by year',
                url: 'FitnesstoPractice_pub/PFS1'

            }],
            uk: [{
                pageId: 'PFU1',
                description: 'FTP UK Map',
                pageHeading: 'FTP-UK Map',
                pageSubheading: 'Current Designated Body of doctors with current sanctions'
            }],
            world: [{
                pageId: 'PFW1',
                description: 'FTP World Map',
                pageHeading: 'FTP-World Map',
                pageSubheading: 'PMQ Country of doctors with sanctions granted in the selected period'
            }, {
                pageId: 'PFW2',
                description: 'FTP World Map Active sanctions',
                pageHeading: 'FTP-World Map',
                pageSubheading: 'PMQ country of doctors with current sanctions'
            }, {
                pageId: 'PFW3',
                description: 'FTP World map Active sanctions % pop',
                pageHeading: '-',
                pageSubheading: '-'
            }]
        }
    }, {
        groupName: 'Employers',
        description: 'At the GMC we maintain Employers. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'PES1',
                description: 'Employers Stats (Register)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key stats from the register, by organisation (Drs\' Designated Bodies)'
            }, {
                pageId: 'PES10',
                description: 'Employer Stats (FTP)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key FTP Stats by Designated Body'
            }, {
                pageId: 'PES11',
                description: '% Doctors complained about over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors complained about over time'
            }, {
                pageId: 'PES12',
                description: '# Doctors referred over time',
                pageHeading: 'Employers overview',
                pageSubheading: 'Doctors referred over time'
            }, {
                pageId: 'PES13',
                description: '# Complaints reported here over time',
                pageHeading: 'Employers overview',
                pageSubheading: '# Complaints reported here over time'
            }, {
                pageId: 'PES14',
                description: '% Doctors with cases over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors with cases over time'
            }, {
                pageId: 'PES15',
                description: '% Doctors with Advice over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors with Advice over time'
            }, {
                pageId: 'PES16',
                description: '% Doctors with Warnings over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors with Warnings over time'
            }, {
                pageId: 'PES17',
                description: '% Doctors with U\'takings over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors with U\'takings over time'
            }, {
                pageId: 'PES18',
                description: '% Doctors with Conditions over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors with Conditions over time'
            }, {
                pageId: 'PES10',
                description: '% Doctors suspended over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors suspended over time'
            }, {
                pageId: 'PES2',
                description: '# Doctors over time',
                pageHeading: 'Employers overview',
                pageSubheading: 'Number of connected/employed doctors over time'
            }, {
                pageId: 'PES20',
                description: '% Doctors Erased over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Doctors Erased over time'
            }, {
                pageId: 'PES21',
                description: 'Employer Stats (Reval)',
                pageHeading: 'Employers overview',
                pageSubheading: 'Key Revalidation stats by Designated Body'
            }, {
                pageId: 'PES22',
                description: '% Not revalidated in 5 years over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Not revalidated in 5 years over time'
            }, {
                pageId: 'PES23',
                description: '% Late submissions over time',
                pageHeading: 'Employers overview',
                pageSubheading: '% Late submissions over time'
            }],

            uk: [{
                pageId: 'PEU1',
                description: 'Employers UK Map',
                pageHeading: 'Employers',
                pageSubheading: 'Doctor\'s employers (Disignated Bodies), by location'
            }]

        }
    }, {
        groupName: 'Medical Schools',
        description: 'At the GMC we maintain Medical Schools. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'X__PMS1',
                description: 'Medical Schools stats',
                pageHeading: '-',
                pageSubheading: ''
            }],
            uk: [{
                pageId: 'X__PMU1',
                description: 'Medical Schools UK Map',
                pageHeading: '-',
                pageSubheading: '-'
            }],
            world: [{
                pageId: 'X__PMW1',
                description: 'Medical Schools World Map',
                pageHeading: '-',
                pageSubheading: '-'
            }]
        }
    }, {
        groupName: 'Royal Colleges',
        description: 'At the GMC we maintain Royal Colleges. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'X_PCS1',
                description: 'Royal Colleges/Specialities Stats',
                pageHeading: '-',
                pageSubheading: '-'
            }],
            uk: [{
                pageId: 'X_PCU1',
                description: 'Royal Colleges/Specialities UK Map'
            }]

        }
    }, {
        groupName: 'Deaneries',
        description: 'At the GMC we maintain Deaneries. Here we describe lots of stuff<br/>And here is another introduction sentence', 
        pages: {
            stats: [{
                pageId: 'X__PDS1',
                description: 'Deaneries Stats',
                pageHeading: '-',
                pageSubheading: '-'
            }]
        }
    }]
};