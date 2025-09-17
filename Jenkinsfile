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
                bat 'composer install --no-interaction --prefer-dist'
                // bat 'npm install'
                echo 'Clearing npm cache...'
                bat 'npm cache clean --force'
                bat 'cd tests\\LOCAL-PourJenkis && npm install'
            }
        }

        stage('Run Test 1') {
            steps {
                echo 'Starting servers...'
                // bat 'start_servers.bat'
                // bat "\"${pwd()}\\start_servers.bat\""
                bat 'C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\JobDoud1\\tests\\LOCAL-PourJenkis\\start_servers.bat'

                // Lance le serveur Selenium (si nécessaire) et exécute les tests Selenium Web Driver
                // bat 'java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "" java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "Selenium Server" java -jar selenium-server-4.35.0.jar standalone > selenium.log 2>&1'
                // bat 'start "Selenium Server" java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'
                // bat 'start "Selenium Server" /B java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'

                // Wait for the Selenium server to be ready
                script {
                    def maxAttempts = 60
                    def attempts = 1
                    def serverIsUp = false

                    while (attempts < maxAttempts && !serverIsUp) {
                            // Check if the server is listening on port 4444
                            // bat 'netstat -an | findstr ":4444.*LISTENING"'
                            def output = bat(script: 'netstat -an | findstr ":4444.*LISTENING"', returnStdout: true, ignoreExitStatus: true)
                            if (output.trim().contains(':4444')) {
                                echo 'Selenium server is up!'
                                serverIsUp = true
                            }
                            echo "Waiting for Selenium server... Attempt ${attempt}/${maxAttempts}"
                            sleep 2
                            attempt++
                    }

                    // if (attempt > maxAttempts) {
                    //     error('Selenium server did not start in time.')
                    // }

                    if (!serverIsUp) {
                        error('Selenium server did not start in time.')
                    }
                }

                // Starts the Symfony web server in the background
                // bat 'start "Symfony Server" php bin/console server:start -d public -v'
                // bat 'start "Symfony Server" php bin/console server:start'
                // bat 'start "Symfony Server" php bin/console server:start --no-tls -d public'
                // bat 'start "Symfony Server" symfony serve'
                // bat 'start "Symfony Server" /B symfony serve'

                // Wait for the Symfony server to be ready (e.g., on port 8000)
                script {
                    def maxAttempts = 30
                    def attempts = 1
                    def serverIsUp = false

                    while (attempts < maxAttempts && !serverIsUp) {
                            // bat 'netstat -an | findstr ":8000.*LISTENING"'
                            def output = bat(script: 'netstat -an | findstr ":8000.*LISTENING"', returnStdout: true, ignoreExitStatus: true)
                            // bat 'curl --fail http://localhost:8000'
                            // powershell 'Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing'
                            // println("Symfony server is up!")
                            // println("Symfony server is up and responsive!")
                            if (output.trim().contains(':8000')) {
                                echo 'Symfony server is up!'
                                serverIsUp = true
                            }

                            echo "Waiting for Symfony server... Attempt ${attempt}/${maxAttempts}"
                            sleep 2
                            attempt++
                    }

                    // if (attempt > maxAttempts) {
                    //     error('Symfony server did not start in time.')
                    // }

                    if (!serverIsUp) {
                        error('Symfony server did not start in time.')
                    }
               
                }

                // Utiliser le nouveau script pour attendre le serveur
                // bat 'cd tests\\LOCAL-PourJenkis && wait_for_server.bat'

                // sh 'npm install' // ou la commande qui lance vos tests (ex: npx mocha)
                // bat 'node tests\\LOCAL-PourJenkis\\S1.js'
                // bat 'mkdir reports'

                echo 'Running tests...'

                retry(2) {
                    timeout(time: 60, unit: 'SECONDS') { // Add a timeout here
                        bat 'cd tests\\LOCAL-PourJenkis && npm test'
                     }
                }
            }
        }

        stage('Report') {
            steps {
                echo 'Publishing test report...'
                // bat 'dir reports' // Add this line
                // Publie les résultats des tests JUnit (si vos tests génèrent un rapport XML)
                // junit 'reports/junit.xml'
                junit testResults: 'reports/junit.xml', skipPublishingChecks: true
                // junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                // junit allowEmptyResults: true, testResults: 'C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\JobDoud1\\reports\\junit.xml'
            }
        }
    }

    post {
        always {
            // This step runs at the end of the pipeline, regardless of success or failure.
            // It ensures the servers are killed.
            echo 'Stopping servers...'
            bat 'taskkill /F /IM java.exe'
            bat 'taskkill /F /IM symfony.exe'
            // bat 'taskkill /F /IM node.exe'
            bat 'taskkill /F /IM node.exe || exit 0' // Add `|| exit 0` to prevent failure

        }
    }
}