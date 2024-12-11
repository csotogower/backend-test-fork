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
                stage("Quality assurance - quality gate"){
                    steps{
                        script{
                            timeout(time: 1, unit: 'MINUTES') {
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK') {
                                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                        }
                    }
                }
            }        
        }


        stage("delivery - subida de a nexus"){
            stages{
                
                stage("1.g. actualiza con tag latest y 1.h actualiza con tabg BUILD_NUMBER"){
                    steps{
                        script {
                            docker.withRegistry("http://localhost:8082", "registry"){
                                sh 'docker build -t backend-test .'
                                sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                                sh 'docker push localhost:8082/backend-test:latest'

                                sh "docker tag backend-test:latest localhost:8082/backend-test:${env.BUILD_NUMBER}"
                                sh "docker push localhost:8082/backend-test:${env.BUILD_NUMBER}"
                            }
                        }
                    }
                }

               
               
            }
        }
         
    }
}
