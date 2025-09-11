pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis le dépôt Git
                git branch: 'main', url: 'https://github.com/doud94220/paris-sportifs-symfony'
            }
        }

        stage('Setup') {
            steps {
                // Installe les dépendances PHP et JavaScript
                sh 'composer install --no-interaction --prefer-dist'
                sh 'npm install'
            }
        }

        stage('Run Test 1') {
            steps {
                // Lance le serveur Selenium (si nécessaire) et exécute les tests Selenium Web Driver
                sh 'java -jar selenium-server-4.35.0.jar standalone'
                // sh 'npm install' // ou la commande qui lance vos tests (ex: npx mocha)
                sh 'node tests\\LOCAL-PourJenkis\\S1.js'
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