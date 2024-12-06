pipeline {
    agent any
    stages{
        stage("1.a. Instalar dependencias"){
            steps{
                sh 'npm install'
            }
        }
        stage("1.c build - buid del proyecto"){
            steps{
                sh 'npm run build'
            }
        }
        stage("1.b test - ejecuta test del proyecto"){
            steps{
                sh 'npm run test'
            }
        }   
    }
}