pipeline {
    agent any

    environment {
        USERNAME = "spensiones"
    }

    stages{
        stage("instalacion de dependencias"){
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true;
                }

            }
            stages{
                stage("1.a. Instalar dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("1.b test - ejecuta test del proyecto"){
                    steps{
                         sh 'npm run test'
                    }
                }
                stage("1.c build - buid del proyecto"){
                    steps{
                        sh 'npm run build'
                    }
                }
               
            }
        }

        stage("Quality assurance"){
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages{
                stage("Quality assurance - sonarqube"){
                    steps{
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
            }

            
        }
          
    }
}