// Translation system for Tulia Mental Health App
const translations = {
    en: {
        // Navigation
        home: "Home",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        login: "Login",
        logout: "Logout",
        signup: "Sign Up",
        
        // Login Page
        welcomeBack: "Welcome back! Please sign in to your account.",
        username: "Username",
        password: "Password",
        language: "Language",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        signIn: "Sign In",
        dontHaveAccount: "Don't have an account?",
        createAccount: "Create Account",
        
        // Signup Page
        createAccountTitle: "Create Account",
        joinTulia: "Join Tulia and start your mental wellness journey today.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        preferredLanguage: "Preferred Language",
        selectLanguage: "Select your preferred language",
        confirmPassword: "Confirm Password",
        passwordRequirements: "Password Requirements:",
        atLeast8Chars: "At least 8 characters long",
        oneCapital: "At least one capital letter",
        oneLowercase: "At least one lowercase letter",
        oneDigit: "At least one digit",
        passwordStrength: "Password strength",
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
        agreeTerms: "I agree to the Terms of Service and Privacy Policy",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        
        // Role Selection
        chooseRole: "Choose Your Role",
        selectRole: "Please select your role to continue",
        patient: "Patient",
        patientDesc: "I'm seeking mental health support and resources",
        therapist: "Therapist",
        therapistDesc: "I'm a mental health professional providing care",
        continue: "Continue",
        
        // Dashboards
        welcomeBackUser: "Welcome back",
        readyToContinue: "Ready to continue your mental wellness journey? Here's what you can do today.",
        readyToHelp: "Ready to help your patients on their mental wellness journey? Here's what you can do today.",
        myJournal: "My Journal",
        journalDesc: "Write about your thoughts, feelings, and experiences in your personal digital journal.",
        startWriting: "Start Writing",
        moodTracker: "Mood Tracker",
        moodDesc: "Track your daily moods and emotions to better understand your mental health patterns.",
        trackMood: "Track Mood",
        therapyConnect: "Therapy Connect",
        therapyDesc: "Connect with qualified therapists for professional support and guidance.",
        connectNow: "Connect Now",
        contactSupport: "Contact Support",
        contactDesc: "Get in touch with our support team for any questions or assistance you need.",
        patientRecords: "Patient Records",
        recordsDesc: "Manage and view your patients' information, progress, and treatment plans.",
        viewRecords: "View Records",
        goHome: "Go Home",
        homeDesc: "Return to the main application homepage to explore all features.",
        learnMore: "Learn More",
        aboutDesc: "Learn more about Tulia and our mission to support mental wellness.",
        
        // Quick Actions
        quickActions: "Quick Actions",
        newJournalEntry: "New Journal Entry",
        logTodaysMood: "Log Today's Mood",
        findTherapist: "Find Therapist",
        addNewPatient: "Add New Patient",
        searchRecords: "Search Records",
        
        // Patient Records
        patientRecordsTitle: "Patient Records",
        searchPatients: "Search patients...",
        addPatient: "Add Patient",
        name: "Name",
        age: "Age",
        email: "Email",
        phone: "Phone",
        status: "Status",
        actions: "Actions",
        viewDetails: "View Details",
        edit: "Edit",
        delete: "Delete",
        active: "Active",
        inactive: "Inactive",
        addNewPatientTitle: "Add New Patient",
        save: "Save",
        cancel: "Cancel",
        patientDetails: "Patient Details",
        close: "Close",
        
        // Messages
        pleaseFillAllFields: "Please fill in all fields",
        invalidEmail: "Please enter a valid email address",
        invalidPhone: "Please enter a valid phone number",
        passwordRequirementsNotMet: "Please ensure your password meets all requirements",
        passwordsDoNotMatch: "Passwords do not match",
        agreeToTerms: "Please agree to the Terms of Service and Privacy Policy",
        accountCreatedSuccess: "Account created successfully! Redirecting...",
        loginSuccess: "Login successful! Redirecting...",
        invalidCredentials: "Invalid username or password",
        loggedOutSuccess: "Logged out successfully",
        
        // About Page
        aboutTitle: "About Us",
        aboutHero: "Supporting Mental Wellness, One Step at a Time",
        aboutSubtitle: "Tulia is dedicated to providing accessible mental health resources and support for everyone.",
        ourMission: "Our Mission",
        missionText: "We believe that mental health support should be accessible, affordable, and stigma-free. Our platform connects individuals with the resources they need to improve their mental well-being.",
        ourTeam: "Our Team",
        teamText: "Our team consists of mental health professionals, developers, and advocates who are passionate about making mental health support accessible to everyone.",
        getStarted: "Get Started",
        learnMoreAbout: "Learn More About Tulia"
    },
    
    es: {
        // Navigation
        home: "Inicio",
        aboutUs: "Sobre Nosotros",
        contactUs: "Contáctanos",
        login: "Iniciar Sesión",
        logout: "Cerrar Sesión",
        signup: "Registrarse",
        
        // Login Page
        welcomeBack: "¡Bienvenido de vuelta! Por favor inicia sesión en tu cuenta.",
        username: "Nombre de usuario",
        password: "Contraseña",
        language: "Idioma",
        rememberMe: "Recordarme",
        forgotPassword: "¿Olvidaste tu contraseña?",
        signIn: "Iniciar Sesión",
        dontHaveAccount: "¿No tienes una cuenta?",
        createAccount: "Crear Cuenta",
        
        // Signup Page
        createAccountTitle: "Crear Cuenta",
        joinTulia: "Únete a Tulia y comienza tu viaje de bienestar mental hoy.",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electrónico",
        phoneNumber: "Número de teléfono",
        preferredLanguage: "Idioma preferido",
        selectLanguage: "Selecciona tu idioma preferido",
        confirmPassword: "Confirmar contraseña",
        passwordRequirements: "Requisitos de contraseña:",
        atLeast8Chars: "Al menos 8 caracteres de largo",
        oneCapital: "Al menos una letra mayúscula",
        oneLowercase: "Al menos una letra minúscula",
        oneDigit: "Al menos un dígito",
        passwordStrength: "Fortaleza de contraseña",
        weak: "Débil",
        fair: "Regular",
        good: "Buena",
        strong: "Fuerte",
        agreeTerms: "Acepto los Términos de Servicio y la Política de Privacidad",
        termsOfService: "Términos de Servicio",
        privacyPolicy: "Política de Privacidad",
        
        // Role Selection
        chooseRole: "Elige Tu Rol",
        selectRole: "Por favor selecciona tu rol para continuar",
        patient: "Paciente",
        patientDesc: "Busco apoyo y recursos de salud mental",
        therapist: "Terapeuta",
        therapistDesc: "Soy un profesional de salud mental que brinda atención",
        continue: "Continuar",
        
        // Dashboards
        welcomeBackUser: "Bienvenido de vuelta",
        readyToContinue: "¿Listo para continuar tu viaje de bienestar mental? Aquí tienes lo que puedes hacer hoy.",
        readyToHelp: "¿Listo para ayudar a tus pacientes en su viaje de bienestar mental? Aquí tienes lo que puedes hacer hoy.",
        myJournal: "Mi Diario",
        journalDesc: "Escribe sobre tus pensamientos, sentimientos y experiencias en tu diario digital personal.",
        startWriting: "Comenzar a Escribir",
        moodTracker: "Seguimiento de Estado de Ánimo",
        moodDesc: "Rastrea tus estados de ánimo y emociones diarias para entender mejor tus patrones de salud mental.",
        trackMood: "Rastrear Estado de Ánimo",
        therapyConnect: "Conectar con Terapia",
        therapyDesc: "Conéctate con terapeutas calificados para apoyo y orientación profesional.",
        connectNow: "Conectar Ahora",
        contactSupport: "Contactar Soporte",
        contactDesc: "Ponte en contacto con nuestro equipo de soporte para cualquier pregunta o asistencia que necesites.",
        patientRecords: "Registros de Pacientes",
        recordsDesc: "Gestiona y visualiza la información, progreso y planes de tratamiento de tus pacientes.",
        viewRecords: "Ver Registros",
        goHome: "Ir al Inicio",
        homeDesc: "Regresa a la página principal de la aplicación para explorar todas las funciones.",
        learnMore: "Saber Más",
        aboutDesc: "Aprende más sobre Tulia y nuestra misión de apoyar el bienestar mental.",
        
        // Quick Actions
        quickActions: "Acciones Rápidas",
        newJournalEntry: "Nueva Entrada de Diario",
        logTodaysMood: "Registrar Estado de Ánimo de Hoy",
        findTherapist: "Encontrar Terapeuta",
        addNewPatient: "Agregar Nuevo Paciente",
        searchRecords: "Buscar Registros",
        
        // Patient Records
        patientRecordsTitle: "Registros de Pacientes",
        searchPatients: "Buscar pacientes...",
        addPatient: "Agregar Paciente",
        name: "Nombre",
        age: "Edad",
        email: "Correo electrónico",
        phone: "Teléfono",
        status: "Estado",
        actions: "Acciones",
        viewDetails: "Ver Detalles",
        edit: "Editar",
        delete: "Eliminar",
        active: "Activo",
        inactive: "Inactivo",
        addNewPatientTitle: "Agregar Nuevo Paciente",
        save: "Guardar",
        cancel: "Cancelar",
        patientDetails: "Detalles del Paciente",
        close: "Cerrar",
        
        // Messages
        pleaseFillAllFields: "Por favor completa todos los campos",
        invalidEmail: "Por favor ingresa una dirección de correo válida",
        invalidPhone: "Por favor ingresa un número de teléfono válido",
        passwordRequirementsNotMet: "Por favor asegúrate de que tu contraseña cumpla con todos los requisitos",
        passwordsDoNotMatch: "Las contraseñas no coinciden",
        agreeToTerms: "Por favor acepta los Términos de Servicio y la Política de Privacidad",
        accountCreatedSuccess: "¡Cuenta creada exitosamente! Redirigiendo...",
        loginSuccess: "¡Inicio de sesión exitoso! Redirigiendo...",
        invalidCredentials: "Nombre de usuario o contraseña inválidos",
        loggedOutSuccess: "Sesión cerrada exitosamente",
        
        // About Page
        aboutTitle: "Sobre Nosotros",
        aboutHero: "Apoyando el Bienestar Mental, Un Paso a la Vez",
        aboutSubtitle: "Tulia está dedicada a proporcionar recursos y apoyo de salud mental accesibles para todos.",
        ourMission: "Nuestra Misión",
        missionText: "Creemos que el apoyo de salud mental debe ser accesible, asequible y libre de estigma. Nuestra plataforma conecta a las personas con los recursos que necesitan para mejorar su bienestar mental.",
        ourTeam: "Nuestro Equipo",
        teamText: "Nuestro equipo consiste en profesionales de salud mental, desarrolladores y defensores que son apasionados por hacer que el apoyo de salud mental sea accesible para todos.",
        getStarted: "Comenzar",
        learnMoreAbout: "Saber Más Sobre Tulia"
    },
    
    fr: {
        // Navigation
        home: "Accueil",
        aboutUs: "À Propos",
        contactUs: "Contactez-nous",
        login: "Connexion",
        logout: "Déconnexion",
        signup: "S'inscrire",
        
        // Login Page
        welcomeBack: "Bon retour ! Veuillez vous connecter à votre compte.",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        language: "Langue",
        rememberMe: "Se souvenir de moi",
        forgotPassword: "Mot de passe oublié ?",
        signIn: "Se Connecter",
        dontHaveAccount: "Vous n'avez pas de compte ?",
        createAccount: "Créer un Compte",
        
        // Signup Page
        createAccountTitle: "Créer un Compte",
        joinTulia: "Rejoignez Tulia et commencez votre voyage de bien-être mental aujourd'hui.",
        firstName: "Prénom",
        lastName: "Nom de famille",
        email: "E-mail",
        phoneNumber: "Numéro de téléphone",
        preferredLanguage: "Langue préférée",
        selectLanguage: "Sélectionnez votre langue préférée",
        confirmPassword: "Confirmer le mot de passe",
        passwordRequirements: "Exigences du mot de passe :",
        atLeast8Chars: "Au moins 8 caractères de long",
        oneCapital: "Au moins une lettre majuscule",
        oneLowercase: "Au moins une lettre minuscule",
        oneDigit: "Au moins un chiffre",
        passwordStrength: "Force du mot de passe",
        weak: "Faible",
        fair: "Moyen",
        good: "Bon",
        strong: "Fort",
        agreeTerms: "J'accepte les Conditions d'utilisation et la Politique de confidentialité",
        termsOfService: "Conditions d'utilisation",
        privacyPolicy: "Politique de confidentialité",
        
        // Role Selection
        chooseRole: "Choisissez Votre Rôle",
        selectRole: "Veuillez sélectionner votre rôle pour continuer",
        patient: "Patient",
        patientDesc: "Je recherche un soutien et des ressources en santé mentale",
        therapist: "Thérapeute",
        therapistDesc: "Je suis un professionnel de la santé mentale qui fournit des soins",
        continue: "Continuer",
        
        // Dashboards
        welcomeBackUser: "Bon retour",
        readyToContinue: "Prêt à continuer votre voyage de bien-être mental ? Voici ce que vous pouvez faire aujourd'hui.",
        readyToHelp: "Prêt à aider vos patients dans leur voyage de bien-être mental ? Voici ce que vous pouvez faire aujourd'hui.",
        myJournal: "Mon Journal",
        journalDesc: "Écrivez sur vos pensées, sentiments et expériences dans votre journal numérique personnel.",
        startWriting: "Commencer à Écrire",
        moodTracker: "Suivi de l'Humeur",
        moodDesc: "Suivez vos humeurs et émotions quotidiennes pour mieux comprendre vos schémas de santé mentale.",
        trackMood: "Suivre l'Humeur",
        therapyConnect: "Connexion Thérapeutique",
        therapyDesc: "Connectez-vous avec des thérapeutes qualifiés pour un soutien et une orientation professionnels.",
        connectNow: "Se Connecter Maintenant",
        contactSupport: "Contacter le Support",
        contactDesc: "Contactez notre équipe de support pour toute question ou assistance dont vous avez besoin.",
        patientRecords: "Dossiers des Patients",
        recordsDesc: "Gérez et visualisez les informations, progrès et plans de traitement de vos patients.",
        viewRecords: "Voir les Dossiers",
        goHome: "Aller à l'Accueil",
        homeDesc: "Retournez à la page d'accueil principale de l'application pour explorer toutes les fonctionnalités.",
        learnMore: "En Savoir Plus",
        aboutDesc: "En savoir plus sur Tulia et notre mission de soutenir le bien-être mental.",
        
        // Quick Actions
        quickActions: "Actions Rapides",
        newJournalEntry: "Nouvelle Entrée de Journal",
        logTodaysMood: "Enregistrer l'Humeur d'Aujourd'hui",
        findTherapist: "Trouver un Thérapeute",
        addNewPatient: "Ajouter un Nouveau Patient",
        searchRecords: "Rechercher les Dossiers",
        
        // Patient Records
        patientRecordsTitle: "Dossiers des Patients",
        searchPatients: "Rechercher des patients...",
        addPatient: "Ajouter un Patient",
        name: "Nom",
        age: "Âge",
        email: "E-mail",
        phone: "Téléphone",
        status: "Statut",
        actions: "Actions",
        viewDetails: "Voir les Détails",
        edit: "Modifier",
        delete: "Supprimer",
        active: "Actif",
        inactive: "Inactif",
        addNewPatientTitle: "Ajouter un Nouveau Patient",
        save: "Enregistrer",
        cancel: "Annuler",
        patientDetails: "Détails du Patient",
        close: "Fermer",
        
        // Messages
        pleaseFillAllFields: "Veuillez remplir tous les champs",
        invalidEmail: "Veuillez entrer une adresse e-mail valide",
        invalidPhone: "Veuillez entrer un numéro de téléphone valide",
        passwordRequirementsNotMet: "Veuillez vous assurer que votre mot de passe répond à toutes les exigences",
        passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
        agreeToTerms: "Veuillez accepter les Conditions d'utilisation et la Politique de confidentialité",
        accountCreatedSuccess: "Compte créé avec succès ! Redirection...",
        loginSuccess: "Connexion réussie ! Redirection...",
        invalidCredentials: "Nom d'utilisateur ou mot de passe invalide",
        loggedOutSuccess: "Déconnexion réussie",
        
        // About Page
        aboutTitle: "À Propos de Nous",
        aboutHero: "Soutenir le Bien-être Mental, Une Étape à la Fois",
        aboutSubtitle: "Tulia est dédié à fournir des ressources et un soutien en santé mentale accessibles à tous.",
        ourMission: "Notre Mission",
        missionText: "Nous croyons que le soutien en santé mentale doit être accessible, abordable et sans stigmatisation. Notre plateforme connecte les individus aux ressources dont ils ont besoin pour améliorer leur bien-être mental.",
        ourTeam: "Notre Équipe",
        teamText: "Notre équipe se compose de professionnels de la santé mentale, de développeurs et d'advocats qui sont passionnés par l'accessibilité du soutien en santé mentale pour tous.",
        getStarted: "Commencer",
        learnMoreAbout: "En Savoir Plus sur Tulia"
    },
    sw: {
        // Swahili translations
        home: "Nyumbani",
        aboutUs: "Kuhusu Sisi",
        contactUs: "Wasiliana Nasi",
        login: "Ingia",
        logout: "Toka",
        signup: "Jisajili",
        welcomeBack: "Karibu tena! Tafadhali ingia kwenye akaunti yako.",
        username: "Jina la mtumiaji",
        password: "Nenosiri",
        language: "Lugha",
        rememberMe: "Nikumbuke",
        forgotPassword: "Umesahau nenosiri?",
        signIn: "Ingia",
        dontHaveAccount: "Huna akaunti?",
        createAccount: "Unda Akaunti",
        createAccountTitle: "Unda Akaunti",
        joinTulia: "Jiunge na Tulia uanze safari yako ya afya ya akili leo.",
        firstName: "Jina la Kwanza",
        lastName: "Jina la Mwisho",
        email: "Barua pepe",
        phoneNumber: "Nambari ya Simu",
        preferredLanguage: "Lugha Unayopendelea",
        selectLanguage: "Chagua lugha unayopendelea",
        confirmPassword: "Thibitisha Nenosiri",
        passwordRequirements: "Mahitaji ya Nenosiri:",
        atLeast8Chars: "Angalau herufi 8",
        oneCapital: "Angalau herufi moja kubwa",
        oneLowercase: "Angalau herufi moja ndogo",
        oneDigit: "Angalau tarakimu moja",
        passwordStrength: "Nguvu ya nenosiri",
        weak: "Dhaifu",
        fair: "Wastani",
        good: "Nzuri",
        strong: "Imara",
        agreeTerms: "Ninakubali Masharti ya Huduma na Sera ya Faragha",
        termsOfService: "Masharti ya Huduma",
        privacyPolicy: "Sera ya Faragha",
        chooseRole: "Chagua Nafasi Yako",
        selectRole: "Tafadhali chagua nafasi yako kuendelea",
        patient: "Mgonjwa",
        patientDesc: "Natafuta msaada na rasilimali za afya ya akili",
        therapist: "Mshauri",
        therapistDesc: "Mimi ni mtaalamu wa afya ya akili",
        continue: "Endelea",
        welcomeBackUser: "Karibu tena",
        readyToContinue: "Uko tayari kuendelea na safari yako ya afya ya akili? Hivi ndivyo unavyoweza kufanya leo.",
        readyToHelp: "Uko tayari kuwasaidia wagonjwa wako? Hivi ndivyo unavyoweza kufanya leo.",
        myJournal: "Shajara Yangu",
        journalDesc: "Andika mawazo, hisia, na uzoefu wako katika shajara yako ya kidijitali.",
        startWriting: "Anza Kuandika",
        moodTracker: "Kifuatiliaji cha Hisia",
        moodDesc: "Fuatilia hisia zako za kila siku kuelewa mifumo yako ya afya ya akili.",
        trackMood: "Fuatilia Hisia",
        therapyConnect: "Ungana na Mshauri",
        therapyDesc: "Ungana na washauri waliohitimu kwa msaada wa kitaalamu.",
        connectNow: "Ungana Sasa",
        contactSupport: "Wasiliana na Msaada",
        contactDesc: "Wasiliana na timu yetu ya msaada kwa maswali au msaada wowote.",
        patientRecords: "Rekodi za Wagonjwa",
        recordsDesc: "Simamia na tazama taarifa za wagonjwa wako, maendeleo, na mipango ya matibabu.",
        viewRecords: "Tazama Rekodi",
        goHome: "Rudi Nyumbani",
        homeDesc: "Rudi kwenye ukurasa mkuu wa programu kuchunguza vipengele vyote.",
        learnMore: "Jifunze Zaidi",
        aboutDesc: "Jifunze zaidi kuhusu Tulia na dhamira yetu ya kusaidia afya ya akili.",
        quickActions: "Vitendo vya Haraka",
        newJournalEntry: "Ingizo Jipya la Shajara",
        logTodaysMood: "Rekodi Hisia za Leo",
        findTherapist: "Tafuta Mshauri",
        addNewPatient: "Ongeza Mgonjwa Mpya",
        searchRecords: "Tafuta Rekodi",
        patientRecordsTitle: "Rekodi za Wagonjwa",
        searchPatients: "Tafuta wagonjwa...",
        addPatient: "Ongeza Mgonjwa",
        name: "Jina",
        age: "Umri",
        status: "Hali",
        actions: "Vitendo",
        viewDetails: "Tazama Maelezo",
        edit: "Hariri",
        delete: "Futa",
        active: "Hai",
        inactive: "Si Hai",
        addNewPatientTitle: "Ongeza Mgonjwa Mpya",
        save: "Hifadhi",
        cancel: "Ghairi",
        patientDetails: "Maelezo ya Mgonjwa",
        close: "Funga",
        pleaseFillAllFields: "Tafadhali jaza sehemu zote",
        invalidEmail: "Tafadhali ingiza barua pepe sahihi",
        invalidPhone: "Tafadhali ingiza nambari ya simu sahihi",
        passwordRequirementsNotMet: "Tafadhali hakikisha nenosiri lako linakidhi mahitaji yote",
        passwordsDoNotMatch: "Nenosiri halilingani",
        agreeToTerms: "Tafadhali kubali Masharti ya Huduma na Sera ya Faragha",
        accountCreatedSuccess: "Akaunti imeundwa kwa mafanikio! Inapelekwa...",
        loginSuccess: "Umeingia kwa mafanikio! Inapelekwa...",
        invalidCredentials: "Jina la mtumiaji au nenosiri si sahihi",
        loggedOutSuccess: "Umetoka kwa mafanikio",
        aboutTitle: "Kuhusu Sisi",
        aboutHero: "Kusaidia Afya ya Akili, Hatua Moja kwa Wakati",
        aboutSubtitle: "Tulia imejitolea kutoa rasilimali na msaada wa afya ya akili kwa kila mtu.",
        ourMission: "Dhamira Yetu",
        missionText: "Tunaamini msaada wa afya ya akili unapaswa kupatikana, kuwa nafuu, na bila unyanyapaa. Jukwaa letu linaunganisha watu na rasilimali wanazohitaji kuboresha afya yao ya akili.",
        ourTeam: "Timu Yetu",
        teamText: "Timu yetu inajumuisha wataalamu wa afya ya akili, watengenezaji, na watetezi wanaopenda kufanya msaada wa afya ya akili upatikane kwa wote.",
        getStarted: "Anza",
        learnMoreAbout: "Jifunze Zaidi Kuhusu Tulia"
    }
};

// Language utility functions
const LanguageManager = {
    currentLanguage: 'en',
    
    // Initialize language system
    init() {
        this.currentLanguage = localStorage.getItem('userLanguage') || 'en';
        this.applyLanguage();
    },
    
    // Set language
    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('userLanguage', language);
        this.applyLanguage();
    },
    
    // Get translation
    get(key) {
        return translations[this.currentLanguage]?.[key] || translations.en[key] || key;
    },
    
    // Apply language to current page
    applyLanguage() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.get(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update page title
        const pageTitle = document.querySelector('title');
        if (pageTitle) {
            const titleKey = document.body.getAttribute('data-page-title');
            if (titleKey) {
                pageTitle.textContent = this.get(titleKey);
            }
        }
        
        // Update language indicator
        const languageIndicator = document.getElementById('userLanguage');
        if (languageIndicator) {
            const languageNames = {
                'en': 'EN', 'es': 'ES', 'fr': 'FR', 'de': 'DE', 'it': 'IT',
                'pt': 'PT', 'ru': 'RU', 'zh': 'ZH', 'ja': 'JA', 'ko': 'KO',
                'ar': 'AR', 'hi': 'HI', 'sw': 'SW', 'am': 'AM', 'yo': 'YO',
                'ig': 'IG', 'ha': 'HA'
            };
            languageIndicator.textContent = languageNames[this.currentLanguage] || 'EN';
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, LanguageManager };
} 