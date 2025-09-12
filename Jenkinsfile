pipeline {
    agent any

    // Use a Windows agent
    // This is a more explicit way to tell Jenkins to use a Windows shell.
    // agent {
    //     label 'windows' // Or the label you've set for your Windows machine
    // }

    stages {
        // stage('Checkout') {
        //     steps {
        //         // Récupère le code depuis le dépôt Git
        //         git branch: 'main', url: 'https://github.com/doud94220/paris-sportifs-symfony'
        //     }
        // }

        stage('Setup') {
            steps {
                // Installe les dépendances PHP et JavaScript
                bat 'composer install --no-interaction --prefer-dist --no-verify'
                bat 'npm install'
            }
        }

        stage('Run Test 1') {
            steps {
                // Lance le serveur Selenium (si nécessaire) et exécute les tests Selenium Web Driver
                // bat 'java -jar selenium-server-4.35.0.jar standalone'
                bat 'start "" java -jar selenium-server-4.35.0.jar standalone'
                // sh 'npm install' // ou la commande qui lance vos tests (ex: npx mocha)
                bat 'node tests\\LOCAL-PourJenkis\\S1.js'
            }
        }

        stage('Report') {
            steps {
                // Publie les résultats des tests JUnit (si vos tests génèrent un rapport XML)
                junit 'reports/junit.xml'
            }
        }
    }
}